import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import logo from "../../images/logo.png";
import { useHistory } from "react-router";
const AuthNavbar = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
    history.go(0);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning ">
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid">
        {/* <!-- Toggle button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* <!-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}
          <div className="navbar-brand mt-2 mt-lg-0">
            <img
              src={logo}
              className="me-2"
              height="50"
              alt=""
              loading="lazy"
            />
            <small
              className="ml-5"
              style={{ color: "white", fontWeight: "900", fontSize: "20px" }}
            >
              Socialelite
            </small>
          </div>
        </div>
        {/* <!-- Collapsible wrapper -->
  
      <!-- Right elements --> */}
        <div className="d-flex align-items-center mr-5">
          <MDBDropdown className="mr-5  white-text">
            <MDBDropdownToggle nav caret className="white-text">
              <MDBIcon icon="user" className=" white-text" />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default white-text">
              <MDBDropdownItem onClick={logout}>Logout</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>
        {/* <!-- Right elements --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
  );
};

export default AuthNavbar;
