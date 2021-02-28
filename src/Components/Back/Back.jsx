import React from "react";
import { NavLink } from "react-router-dom";
import './Back.scss';

export const Back = () => (
  <NavLink className="back" to="/">
    Back to home
  </NavLink>
);