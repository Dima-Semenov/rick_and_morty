import React, { useEffect, useState } from "react";
import { getCharacter, getFiltredCharacter } from "../../api";
import { CurrenHero } from "./CurrentHero/CurrentHero";
import './Character.scss';
import { ModalWindow } from "./ModalWindow/ModalWindow";
import { NavLink } from "react-router-dom";
import ErrorPhoto from '../../img/Error.png';

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

      <NavLink className="character__back" to="/">
        Back to home
      </NavLink>

      <h1 className="character__title">Character</h1>

      {isWindowOpen && <ModalWindow {...windowData} reset={setIsWindowOpen} />}

      <div className="character__filter">
        <form className="character__form">
          <label>
            Search by name:
            {' '}
            <input
              type='text'
              className={`${error ? 'er' : ''}`}
              value={name}
              placeholder="Search by name"
              onChange={(event) => {
                setName(event.target.value)
                setError(false)
              }}
            />
          </label>

          <label>
            Search by gender:
            <select value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value=''>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='genderless'>Genderless</option>
              <option value='unknown'>Unknown</option>
            </select>
          </label>

          <label>
            Search by status:
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value=''>All</option>
              <option value='alive'>Alive</option>
              <option value='dead'>Dead</option>
              <option value='unknown'>Unknown</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleClick}
          >
            Reset filter
          </button>
        </form>
      </div>
      
      <div className="character__container">
        {
          error ? (
            <img src={ErrorPhoto} className="d" alt="Error"/>
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
