import React, { useEffect, useState } from "react";
import { request } from "../../api";
import { CurrenHero } from "./CurrentHero/CurrentHero";
import './Character.scss';
import { ModalWindow } from "./ModalWindow/ModalWindow";

export const Charecter = () => {
  const [character, setCharacter] = useState([]);
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowData, setWindowData] = useState(null);


  useEffect(() => {
    if (gender || name || status) {
      request(`/character/?name=${name}&gender=${gender}&status=${status}`)
      .then(result => setCharacter(result.results))
      .catch(e => setError(true))
    } else {
      request(`/character`)
      .then(result => {
        setCharacter(result.results)
        console.log(result.results)
        })
    }
  }, [gender, status, name])

  return (
    <>
      {isWindowOpen && <ModalWindow {...windowData} reset={setIsWindowOpen} />}
      <div>
        <form>
          <input
            type='text'
            className={`${error ? 'er' : ''}`}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setError(false)
            }}
          />
          <select value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value=''>All</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='genderless'>Genderless</option>
            <option value='unknown'>Unknown</option>
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value=''>All</option>
            <option value='alive'>Alive</option>
            <option value='dead'>Dead</option>
            <option value='unknown'>Unknown</option>
          </select>
        </form>
      </div>
      <div className="character">
        {
          character.map(hero => (
            <CurrenHero
              data={hero}
              key={hero.id}
              setIsWindowOpen={setIsWindowOpen}
              setWindowData={setWindowData}
            />
          ))
        }
      </div>
    </>
  );
};
