import React from "react";

import "./login.css";
const LoginForm = () => {
  return (
           <div>
    <div className="input-container">
    <input type="text" placeholder="Username"/>
    <i class="zmdi zmdi-account zmdi-hc-lg"></i>
  </div>
  
  <div className="input-container">
    <input type="password" placeholder="Password"/>
    <i class="zmdi zmdi-lock zmdi-hc-lg"></i>
  </div>
  
  <button type="submit">Log In</button>
  </div>
  );
};

export default LoginForm;
