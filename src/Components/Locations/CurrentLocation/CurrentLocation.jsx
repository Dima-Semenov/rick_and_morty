import React from "react";

export const CurrentLocation = ({ name, dimension, type}) => {

  return (
    <tr>
      <td>{name}</td>
      <td>{dimension}</td>
      <td>{type}</td>
    </tr>
  );
}
