import React from "react";
import { NavLink } from "react-router-dom";
 
import StyleWrapper from './404.style';

 export default (): JSX.Element => (
  <StyleWrapper>
    <h1>404</h1>
    <NavLink to="/">Back to Home</NavLink>
  </StyleWrapper>
 );
