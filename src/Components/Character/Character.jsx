import React, { useEffect, useState } from "react";
import { getCharacter, getFiltredCharacter } from "../../api";
import { CurrenHero } from "./CurrentHero/CurrentHero";
import { ModalWindow } from "./ModalWindow/ModalWindow";
import { Error } from "../Error/Error";
import { Back } from "../Back/Back";
import classNames from 'classnames';
import './Character.scss';

export const Charecter = () => {
  const [character, setCharacter] = useState([]);
  const [filteredCharacter, setFilteredCharacter] = useState([]);
  const [data, setData] = useState([]);

  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const [error, setError] = useState(false);

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowData, setWindowData] = useState(null);

  useEffect(() => {
    if (gender || name || status) {
      getFiltredCharacter(name, gender, status)
        .then(result => {
          setFilteredCharacter(result.results);
          setPage(1);
          setCharacter([]);
        })
        .catch(e => setError(true))
    } else {
      getCharacter(page)
        .then(result => {
          setCharacter(prev => [...prev, ...result.results]);
          setFilteredCharacter([])
      })
    }
  }, [gender, status, name, page]);

  useEffect(() => {
    if (filteredCharacter.length > 0) {
      setData(filteredCharacter);
    } else {
      setData(character);
    }
  }, [filteredCharacter, character])

  const handleScroll = (event) => {
    const { scrollHeight } = event.currentTarget;
    const { scrollY, innerHeight } = window;

    if (Math.ceil(scrollY + innerHeight) >= scrollHeight && page < 34 && filteredCharacter.length === 0) {
      setPage(prev => prev + 1);
    }
  }

  const handleClick = () => {
    setGender('');
    setName('');
    setStatus('');
    setError('');
  }

  return (
    <div className="character" onWheel={handleScroll}>
      <Back />
      <h1 className="character__title">Character</h1>

      {isWindowOpen && <ModalWindow {...windowData} reset={setIsWindowOpen} />}

      <div className="character__filter">
        <form className="character__form">
          <div className="character__wrapper">
            <label htmlFor="name" className="character__text">
              Search by name
            </label>
            <input
              type='text'
              id="name"
              value={name}
              placeholder="Search by name"
              onChange={(event) => {
                setName(event.target.value)
                setError(false)
              }}
              className={classNames(
                "app__input",
                {'app__input-error': error},
              )}
            />
          </div>

          <div className="character__wrapper">
            <label htmlFor="gender" className="character__text">
              Search by gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="app__input"
            >
              <option value=''>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='genderless'>Genderless</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
          
          <div className="character__wrapper">
            <label htmlFor="status" className="character__text">
              Search by status
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="app__input"
              id="status"
            >
              <option value=''>All</option>
              <option value='alive'>Alive</option>
              <option value='dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className="character__button"
          >
            Reset filter
          </button>
        </form>
      </div>
      
      <div className="character__container">
        {
          error ? (
            <Error />
          ) : (
            <>
              {
                data.map(hero => (
                  <CurrenHero
                    data={hero}
                    key={hero.id}
                    setIsWindowOpen={setIsWindowOpen}
                    setWindowData={setWindowData}
                  />
                ))
              }
            </>
          )
        }
      </div>
    </div>
  );
};
