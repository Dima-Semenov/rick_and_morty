import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getEpisodes, getFilteredEpisodes } from "../../api";
import { CurrentEpisodes } from "./CurrentEpisodes/CurrentEpisodes";
import './Episodes.scss';
import classNames from 'classnames';
import { Error } from "../Error/Error";
import { Back } from "../Back/Back";

export const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [data,setData] = useState([]);

  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (name) {
      getFilteredEpisodes(name)
        .then(result => {
          setFilteredEpisodes(result.results);
          setEpisodes([]);
          setPage(1);
        })
        .catch(e => {
          setError(true)
          console.log(e)
        });
    } else {
      getEpisodes(page)
        .then(result => {
          setEpisodes(prev => [...prev, ...result.results]);
          setFilteredEpisodes([]);
        })
    }
  }, [page, name]);

  useEffect(() => {
    if (filteredEpisodes.length > 0) {
      setData(filteredEpisodes);
    } else {
      setData(episodes);
    }
  }, [episodes, filteredEpisodes]);

  
  const handleScroll = (event) => {
    const { scrollHeight } = event.currentTarget;
    const { scrollY, innerHeight } = window;


    if (Math.ceil(scrollY + innerHeight) >= scrollHeight && page < 3 && filteredEpisodes.length === 0) {
      setPage(prev => prev + 1);
    }
  }

  const handleChange = (event) => {
    setName(event.target.value);
    setError(false);
  };

  return (
    <div className="episodes" onWheel={handleScroll}>
      <Back />
      <h1 className="character__title">Episodes</h1>

      <div className="episodes__filter">
        <input
          type='text'
          placeholder="Search by name"
          onChange={handleChange}
          value={name}
          className={classNames(
            "app__input",
            {'app__input-error': error},
          )}
        />
      </div>

      <div>
        {
          error ? (
            <Error />
          ) : (
            <table className="episodes__table">
              <thead className="episodes__table_header">
                <tr>
                  <td>Name</td>
                  <td>Date</td>
                  <td>Episode</td>
                </tr>
              </thead>
              <tbody className="episodes__table_body">
                {
                  data.map(item => (
                    <CurrentEpisodes key={item.id} {...item} />
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  )
}
