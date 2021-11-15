import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./dashboard.css";
import noprofile from "../../images/noprofilepic.png";

const Dashboard = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [errormsg, setErrormsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [successmsg, setSuccessmsg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authorisation");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.clear();
        history.push("/");
      }
      axios
        .get(process.env.REACT_APP_Server + "/dashboard", {
          headers: {
            authorisation: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.name);
          setEmail(res.data.email);
          setImageUrl(res.data.imageUrl);
          console.log(res.data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeAvatar = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("image", image);
    axios
      .post(process.env.REACT_APP_Server + "/uploadImage", formData, {
        headers: {
          authorisation: "Bearer " + localStorage.getItem("authorisation"),
        },
      })
      .then((res) => {
        console.log(res);
        setErrormsg("");
        setSuccessmsg(res.request.response);
        window.location.reload();
      })
      .catch((err) => {
        setErrormsg(err.request.response);
      });
  };
  return (
    <section className="vh-100 " style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem;",
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="..."
                      className="img-fluid my-5"
                      style={{ width: "80px;" }}
                    />
                  ) : (
                    <img
                      src={noprofile}
                      alt="..."
                      className="img-fluid my-5"
                      style={{ width: "80px;" }}
                    />
                  )}
                  <h5 className="white-text" style={{fontWeight:"bolder"}}>{name}</h5>
                  <p className="white-text" style={{fontWeight:"bolder"}}>Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4"></hr>
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">123 456 789</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4"></hr>
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Recent</h6>
                        <p className="text-muted">Lorem ipsum</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Most Viewed</h6>
                        <p className="text-muted">Dolor sit amet</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <form
                        encType="multipart/form-data"
                        className="form"
                        onSubmit={changeAvatar}
                      >
                        <div>
                          <input
                            type="file"
                            onChange={(e) => {
                              setImage(e.target.files[0]);
                            }}
                          />
                          <button type="submit">Change Avatar</button>
                        </div>
                      </form>
                    </div>
                    <div>{errormsg}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
