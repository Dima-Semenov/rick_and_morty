import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFiltredLocations, getLocations } from "../../api";
import { CurrentLocation } from "./CurrentLocation/CurrentLocation";
import './Location.scss';

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
        .catch(e => console.log(e))
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

  return (
    <div className="location" onWheel={handleScroll}>
      <NavLink className="character__back" to="/">
        Back to home
      </NavLink>
      <h1 className="character__title">location</h1>

      <div>
        <input
          type='text'
          placeholder="Search by name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type='text'
          placeholder="Search by dimension"
          value={dimension}
          onChange={(event) => setDimension(event.target.value)}
        />
        <input
          type='text'
          placeholder="Search by type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
      </div>

      <div>
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
      </div>
    </div>
  );
};
