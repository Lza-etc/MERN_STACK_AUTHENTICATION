/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router";
import "./login.css";
import unlock from "../../images/unlock.png";
const LoginPage = () => {
  let history = useHistory();
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [errormsg, setErrormsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  const login = (e) => {
    e.preventDefault();
    axios
      // .post("https://socialelite.herokuapp.com/login", {
        .post("http://localhost:5000/login", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then((res) => {
        setErrormsg("");
        setToken(res.data["authorisation"]);
        localStorage.setItem("authorisation", res.data["authorisation"]);
        history.push("/dashboard");
        history.go(0);
      })
      .catch((err) => {
        setErrormsg(err.request.response);
      });
  };

  const responseGoogle = (response) => {
    axios
      // .post("https://socialelite.herokuapp.com/register/google", {
        .post("http://localhost:5000/register/google", {
        googleId: response.profileObj.googleId,
        token: response.tokenId,
      })
      .then((res) => {
        setErrormsg("");
        setToken(res.data["authorisation"]);
        localStorage.setItem("authorisation", res.data["authorisation"]);
        const user = jwt.decode(localStorage.getItem("authorisation"));
        if (user.form) {
          history.push("/dashboard");
          history.go(0);
        } else {
          history.push("/form");
          history.go(0);
        }
      })
      .catch((err) => {
        setErrormsg(err.request.response);
      });
  };
  const failureGoogle = (response) => {
    // setErrormsg(response);
  };
  const responseFacebook = (response) => {
    axios
      // .post("https://socialelite.herokuapp.com/register/facebook", {
        .post("http://localhost:5000/register/facebook", {
        facebookId: response.userID,
        accessToken: response.accessToken,
      })
      .then((res) => {
        setErrormsg("");
        setToken(res.data["authorisation"]);
        localStorage.setItem("authorisation", res.data["authorisation"]);
        const user = jwt.decode(localStorage.getItem("authorisation"));
        if (user.form) {
          history.push("/dashboard");
          history.go(0);
        } else {
          history.push("/form");
          history.go(0);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err.request);
          setErrormsg(err.request.response);
        }
      });
  };

  const failureFacebook = (response) => {
    // setErrormsg(response);
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
              <div className="text-center mt-3 errorMsg ">
                <p>{errormsg}</p>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <div className="mt-3 text-center facebook-div">
                <FacebookLogin
                  appId="4436546636466456"
                  fields="name,email,picture"
                  scope="public_profile, email"
                  autoLoad={false}
                  callback={responseFacebook}
                  onFailure={failureFacebook}
                  render={(renderProps) => (
                    <FacebookLoginButton
                      text={"Continue with Facebook"}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="facebook-btn"
                    />
                  )}
                />
              </div>
              <div className="mt-3 google-div mb-3">
                <GoogleLogin
                  clientId="11449592949-67stjoat4god0tro9orlh3c3kab0oe58.apps.googleusercontent.com"
                  // buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={failureGoogle}
                  autoLoad={false}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <GoogleLoginButton
                      className="google-btn"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      text={"Continue with Google"}
                    />
                  )}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
