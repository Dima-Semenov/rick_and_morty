import React from "react";
import PropTypes from 'prop-types';

export const CurrentLocation = ({
  name,
  dimension,
  type,
}) => (
  <tr>
    <td>{name}</td>
    <td>{dimension}</td>
    <td>{type}</td>
  </tr>
);

CurrentLocation.propTypes = {
  name: PropTypes.string.isRequired,
  dimension: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
