import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import AuthNavbar from "./authNavbar";
const Navbar = () => {
  const [navb, setnav] = useState(true);
  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setnav(false);
    }
  }, []);
  return navb ? (
    <nav className="navbar navbar-light bg-info shadow-5-strong">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} className="me-2" height="50" alt="" loading="lazy" />
          <small
            className="ml-5"
            style={{ color: "white", fontWeight: "900", fontSize: "20px" }}
          >
            Socialelite
          </small>
        </a>
      </div>
    </nav>
  ) : (
    <div>
      <AuthNavbar />
    </div>
  );
};

export default Navbar;
