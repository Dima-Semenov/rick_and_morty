import React, { useEffect, useState } from "react";
import { getFiltredLocations, getLocations } from "../../api";
import { Back } from "../Back/Back";
import { CurrentLocation } from "./CurrentLocation/CurrentLocation";
import './Location.scss';
import classNames from 'classnames';
import { Error } from "../Error/Error";

export const Locations = () => {
  const [locationsData, setLocationsData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  const [page, setPage] = useState(1);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (name || type || dimension) {
      getFiltredLocations(name, type, dimension)
        .then(result => {
          setFilteredLocations(result.results);
          setPage(1);
          setLocationsData([]);
        })
        .catch(e => {
          console.log(e);
          setError(true);
        })
    } else {
      getLocations(page)
        .then(result => {
          setLocationsData(prev => [...prev, ...result.results]);
          setFilteredLocations([]);
        })
    }
  
  }, [name, type, dimension, page]);

  useEffect(() => {
    if (filteredLocations.length > 0) {
      setData(filteredLocations);
    } else {
      setData(locationsData);
    }
  }, [filteredLocations, locationsData]);

  const handleScroll = (event) => {
    const { scrollHeight } = event.currentTarget;
    const { scrollY, innerHeight } = window;


    if (Math.ceil(scrollY + innerHeight) >= scrollHeight && page < 6 && filteredLocations.length === 0) {
      setPage(prev => prev + 1);
    }
  }

  const handleClick = () => {
    setType('');
    setName('');
    setDimension('');
    setError('');
  }

  const handleChange = (target, event) => {
    target(event.target.value);
    setError(false);
  }

  return (
    <div className="location" onWheel={handleScroll}>
      <Back />
      <h1 className="character__title">location</h1>

      <div className="location__filter">
        <div className="location__wrapper">
          <label htmlFor="name" className="location__text">
            Search by name
          </label>
          <input
            id="name"
            type='text'
            placeholder="Search by name"
            value={name}
            onChange={(event) => handleChange(setName, event)}
            className={classNames(
              "app__input",
              {'app__input-error': error},
            )}
          />
        </div>

        <div className="location__wrapper">
          <label htmlFor="dimension" className="location__text">
            Search by dimension
          </label>
          <input
            type='text'
            id="dimension"
            placeholder="Search by dimension"
            value={dimension}
            onChange={(event) => handleChange(setDimension, event)}
            className={classNames(
              "app__input",
              {'app__input-error': error},
            )}
          />
        </div>

        <div className="location__wrapper">
          <label htmlFor="type" className="location__text">
            Search by type
          </label>
          <input
            type='text'
            id="type"
            placeholder="Search by type"
            value={type}
            onChange={(event) => handleChange(setType, event)}
            className={classNames(
              "app__input",
              {'app__input-error': error},
            )}
          />
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="character__button"
        >
          Reset filter
        </button>
      </div>

      <div className="location__container">
        {
          error ? (
            <Error />
          ) : (
            <table className="location__table">
              <thead className="location__table_header">
                <tr>
                  <td>Location name</td>
                  <td>Dimension</td>
                  <td>Type</td>
                </tr>
              </thead>
              <tbody className="location__table_body">
                {
                  data.map(item => (
                      <CurrentLocation key={item.id} {...item} />
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
};
