import React, { useEffect, useState } from "react";
import { getEpisodes } from "../../api";

export const Episodes = () => {

  useEffect(() => {
    getEpisodes(1)
      .then(result => console.log(result))
  }, []);

  return (
    <h1>Episodes</h1>
  )
}