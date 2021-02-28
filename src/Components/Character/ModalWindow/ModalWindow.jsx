import React from "react";
import './ModalWindow.scss';
import PropTypes from 'prop-types';

export const ModalWindow = ({
  reset,
  name,
  image,
  status,
  species,
  gender,
  location
}) => (
  <div className="window">
    <div className="window__container">
    <button
        type="button"
        className="window__button"
        onClick={() => reset(false)}
      >
        X
      </button>

      <img src={image} alt={name} className="window__photo" />
      <h2 className="window__title">{name}</h2>
      <p>
        Gender:
        {' '}
        {gender}
      </p>
      <p>
        Species:
        {' '}
        {species}
      </p>
      <p>
        Status:
        {' '}
        {status}
      </p>
      <p>
        Location:
        {' '}
        {location.name}
      </p>
    </div>
  </div>
);

ModalWindow.propTypes = {
  reset: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};
