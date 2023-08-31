import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import "./profileForm.css";
import { useHistory } from "react-router";

const ProfileForm = () => {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("authorisation");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.clear();
        history.push("/");
      }
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [userDetails, setUserDetails] = useState({
    phone: "",
    specialization: "",
    designation: "",
    bio: "",
    company: "",
  });

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://mernapi-z9cl.onrender.com/dashboard",
        // "http://localhost:5000/dashboard",
        {
          phone: userDetails.phone,
          specialization: userDetails.specialization,
          designation: userDetails.designation,
          bio: userDetails.bio,
          company: userDetails.company,
          form: true,
        },
        {
          headers: {
            authorisation: "Bearer " + localStorage.getItem("authorisation"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        // setErrormsg("");
        // setSuccessmsg(res.request.response);
        history.push("/dashboard");
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
        // setErrormsg(err.request.response);
      });
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <h2>User Profile</h2>

        <div className="form-group">
          <label htmlFor="email">Contact Number:</label>
          <div className="relative">
            <input
              onChange={(e) => {
                setUserDetails({ ...userDetails, phone: e.target.value });
              }}
              className="form-control"
              type="text"
              maxlength="10"
              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
              required
              placeholder="Type your Mobile Number..."
            />
            <i className="fa fa-phone"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Company Name:</label>
          <div className="relative">
            <input
              onChange={(e) => {
                setUserDetails({ ...userDetails, company: e.target.value });
              }}
              className="form-control"
              type="text"
              required
              placeholder="Mention your company"
            />
            <i className="fa fa-building"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Designation:</label>
          <div className="relative">
            <input
              onChange={(e) => {
                setUserDetails({ ...userDetails, designation: e.target.value });
              }}
              className="form-control"
              type="text"
              required
              placeholder="Type your designation..."
            />
            <i className="fa fa-suitcase"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Specilization:</label>
          <div className="relative">
            <input
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  specialization: e.target.value,
                });
              }}
              className="form-control"
              type="text"
              required
              placeholder="Type your specialization..."
            />
            <i className="fa fa-plus-square"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Bio</label>
          <div className="relative">
            <input
              onChange={(e) => {
                setUserDetails({ ...userDetails, bio: e.target.value });
              }}
              className="form-control"
              type="text"
              pattern="[a-zA-Z\s]+"
              required
              autofocus=""
              title="Username should only contain letters. e.g. Piyush Gupta"
              autocomplete=""
              placeholder="Quote your Bio..."
            />
            <i className="fa fa-user"></i>
          </div>
        </div>

        <div className="tright">
          <button className="movebtn movebtnre mr-3" type="Reset">
            <i className="fa fa-fw fa-refresh"></i> Reset{" "}
          </button>

          <button className="movebtn movebtnsu" type="Submit">
            Submit <i className="fa fa-fw fa-paper-plane"></i>
          </button>
        </div>
      </form>

      <div className="thanks" style={{ display: " none" }}>
        <h4>Thank you!</h4>
        <p>
          <small>Your message has been successfully sent.</small>
        </p>
      </div>
    </div>
  );
};

export default ProfileForm;
