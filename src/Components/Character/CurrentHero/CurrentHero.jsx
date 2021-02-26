import React from "react";
// import PropTypes from 'prop-types';
import './CurrentHero.scss';

export const CurrenHero = ({ data, setIsWindowOpen, setWindowData }) => {

  return (
    <div
      className="hero"
      onClick={() => {
        setIsWindowOpen(true)
        setWindowData(data)
      }}
      >
      <img
        className="hero__photo"
        alt={data.name}
        src={data.image}
      />
      <h2 className="hero__name">{data.name}</h2>
      <p className="hero__species">{data.species}</p>
      <p>{data.status}</p>
    </div>
  );
};

// CurrenHero.propTypes = {
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   species: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
// };
