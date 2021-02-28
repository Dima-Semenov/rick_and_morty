import React, { useEffect, useState } from "react";

export const CurrentEpisodes = ({name, episode, air_date}) => {

  return (
    <tr>
      <td>{name}</td>
      <td>{air_date}</td>
      <td>{episode}</td>
    </tr>
  );
};
