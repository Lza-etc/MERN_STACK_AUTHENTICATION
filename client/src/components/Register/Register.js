/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import axios from "axios";
import usePasswordValidator from "react-use-password-validator";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { useHistory } from "react-router";
import unlock from "../../images/unlock.png";
import "./register.css";
const RegisterPage = () => {
  let history = useHistory();
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isValid, setIsValid] = usePasswordValidator({
    min: 6,
  });
  const [errormsg, setErrormsg] = useState("");
  const [token, setToken] = useState("");

  const regsiter = (e) => {
    e.preventDefault();
    if (userRegister.password === userRegister.cpassword) {
      if (isValid) {
        axios
          .post(process.env.REACT_APP_Server + "/register", {
            name: userRegister.name,
            email: userRegister.email,
            password: userRegister.password,
          })
          .then((res) => {
            setErrormsg("");
         
            setToken(res.data["authorisation"]);
            localStorage.setItem("authorisation",res.data["authorisation"]);
            history.push("/dashboard");
          })
          .catch((err) => {
            setErrormsg(err.request.response);
          });
      } else {
        setErrormsg("Password should have atleast 6 characters");
      }
    } else {
      setErrormsg("Passwords do not match!!");
    }
  };
  const responseGoogle = (response) => {
    axios
      .post(process.env.REACT_APP_Server + "/register/google", {
        googleId: response.profileObj.googleId,
        token: response.tokenId,
      })
      .then((res) => {
        console.log(res);
        setErrormsg("");
      })
      .catch((err) => {
        setErrormsg(err.request.response);
      });
  };
  const failureGoogle = (response) => {
    console.log(response);
    // setErrormsg(response);
  };
  const responseFacebook = (response) => {
    axios
      .post("http://localhost:5000/register/facebook", {
        facebookId: response.userID,
        accessToken: response.accessToken,
      })
      .then((res) => {
        console.log(res);
        setErrormsg("");
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
                      text={"Signup with Facebook"}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="facebook-btn"
                    />
                  )}
                />
              </div>
              <div className="mt-3 google-div">
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
                      text={"Sign up with Google"}
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

export default RegisterPage;
