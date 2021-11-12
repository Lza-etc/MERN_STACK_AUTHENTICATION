/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import axios from "axios"
import "./login.css";
import unlock from "../../images/unlock.png";
const LoginPage = () => {
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [errormsg, setErrormsg] = useState("");
  const login = (e) => {
    e.preventDefault();
    console.log(userLogin);
    axios.get("http://localhost:5000/").then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={unlock} className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form
              onSubmit={(e) => {
                login(e);
              }}
            >
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  required
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  onChange={(e) => {
                    setuserLogin({ ...userLogin, email: e.target.value });
                  }}
                />
                <label className="form-label" for="form1Example13">
                  Email address
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input
                  required
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  onChange={(e) => {
                    setuserLogin({
                      ...userLogin,
                      password: e.target.value,
                    });
                  }}
                />
                <label className="form-label" for="form1Example23">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <!-- Checkbox --> */}
                <div className="form-check">
                  <span>Don't have an account?</span>
                  <a href="/register"> Sign Up</a>
                </div>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                // onClick={login}
              >
                Sign in
              </button>
              <div className="text-center mt-3">
                <p>{errormsg}</p>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <a
                className="btn  btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2 mr-2"></i>Continue with
                Facebook
              </a>
              <a
                className="btn  btn-lg btn-block mt-3 mb-3"
                style={{ backgroundColor: "#dd4b39" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google me-2 mr-2"></i>Continue with Google
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
