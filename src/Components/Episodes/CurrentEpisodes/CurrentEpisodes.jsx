import React from "react";
import PropTypes from 'prop-types';

export const CurrentEpisodes = ({
  name,
  episode,
  air_date
}) => (
  <tr>
    <td>{name}</td>
    <td>{air_date}</td>
    <td>{episode}</td>
  </tr>
);

CurrentEpisodes.propTypes = {
  name: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
  air_date: PropTypes.string.isRequired,
};
