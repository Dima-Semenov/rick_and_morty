import React from "react";
import './CurrentLocation.scss';

export const CurrentLocation = ({ name, dimension, type}) => {

  return (
    <tr>
      <td>{name}</td>
      <td>{dimension}</td>
      <td>{type}</td>
    </tr>
  );
}
