/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { GoogleLoginButton } from "react-social-login-buttons";
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
    axios
      .post(process.env.REACT_APP_Server + "/login", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then((res) => {
        console.log(res);
        setErrormsg("");
      })
      .catch((err) => {
        setErrormsg(err.request.response);
      });
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
    setErrormsg(response);
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
