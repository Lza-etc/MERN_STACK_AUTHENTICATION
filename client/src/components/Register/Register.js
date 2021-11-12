/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import axios from "axios";
import usePasswordValidator from 'react-use-password-validator'
import unlock from "../../images/unlock.png";
import "./register.css";
const RegisterPage = () => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [ isValid, setIsValid ] = usePasswordValidator({
    min: 6,
  })
  const [errormsg, setErrormsg] = useState("");

  const regsiter = (e) => {
    e.preventDefault();
    if (userRegister.password === userRegister.cpassword) {
        if(isValid){
            axios
            .post(process.env.REACT_APP_Server + "/register", {
              name: userRegister.name,
              email: userRegister.email,
              password: userRegister.password,
            })
            .then((res) => {
              console.log(res);
              setErrormsg("");
            })
            .catch((err) => {
              setErrormsg(err.request.response);
            });
        }
        else {
            setErrormsg("Password should have atleast 6 characters");
          }

    } else {
      setErrormsg("Passwords do not match!!");
    }
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={unlock} className="img-fluid" alt="Phone image"></img>
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form
              onSubmit={(e) => {
                regsiter(e);
              }}
            >
              {/* <!--     Name input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  required
                  id="form1Example13"
                  className="form-control form-control-lg"
                  onChange={(e) => {
                    setUserRegister({ ...userRegister, name: e.target.value });
                  }}
                />
                <label className="form-label" for="form1Example13">
                  Name
                </label>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  required
                  id="form1Example13"
                  className="form-control form-control-lg"
                  onChange={(e) => {
                    setUserRegister({ ...userRegister, email: e.target.value });
                  }}
                />
                <label className="form-label" for="form1Example13">
                  Email address
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  required
                  id="form1Example23"
                  className="form-control form-control-lg"
                  onChange={(e) => {
                    setUserRegister({
                      ...userRegister,
                      password: e.target.value,
                    });
                    setIsValid(e.target.value);
                  }}
                />
                <label className="form-label" for="form1Example23">
                  Password
                </label>
              </div>

              {/* <!-- Confirm Password input --> */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  required
                  onChange={(e) => {
                    setUserRegister({
                      ...userRegister,
                      cpassword: e.target.value,
                    });
                  }}
                />
                <label className="form-label" for="form1Example23">
                  Confirm Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <!-- Checkbox --> */}
                <div className="form-check">
                  <span>Already have an account?</span>
                  <a href="/"> Log in</a>
                </div>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign up
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
                <i className="fab fa-facebook-f me-2 mr-2"></i> Sign up with
                Facebook
              </a>
              <a
                className="btn  btn-lg btn-block mt-3 mb-3"
                style={{ backgroundColor: "#dd4b39" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-google me-2 mr-2"></i> Sign up with Google
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
