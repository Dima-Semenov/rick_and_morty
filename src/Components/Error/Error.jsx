import React from "react";
import ErrorPhoto from '../../img/Error.png';
import './Error.scss';

export const Error = () => (
  <img src={ErrorPhoto} className="error" alt="Error"/>
);
