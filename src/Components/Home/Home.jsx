import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Home.scss';

export const Home = () => {

  return (
    <div className="home">
      <div className="home__logo"></div>
      <div className="home__container">
        <div className="home__img"></div>
        <div className="home__nav">
          <NavLink className="home__link" to="/character">
            Character
          </NavLink>
          <NavLink className="home__link" to="/locations">
            Locations
          </NavLink>
          <NavLink className="home__link" to="/episodes">
            Episodes
          </NavLink>
        </div>
        <div className="home__img home__img-2"></div>
      </div>
    </div>
  );
};