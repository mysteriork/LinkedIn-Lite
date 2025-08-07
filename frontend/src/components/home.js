import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import "../web.css";
import { useLocation } from "react-router-dom";
import company from "../components/images/companyTag.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navData = useLocation();
  const name = navData.state?.name;

  const [text, setText] = useState("");
  const [details, setDetails] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://minilinkedin-lite.onrender.com/user", {
        user: name.firstname,
        text: text,
      });
      alert("Post has Created !!!");
      setText("");
      showData();
    } catch (error) {
      console.log("error sending data on client side", error.message);
    }
  };

  const showData = () => {
    axios
      .get("https://minilinkedin-lite.onrender.com/user/data")
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => console.log("data not fetched", err.message));
  };

  useEffect(() => {
    showData();
  }, []);

  const profilePic = (namee) => {
    navigate("/profile", { state: { profilename: namee } });
  };
  return (
    <div>
      <nav className="navbar1 flex">
        <a href="/home" className="imagesection">
          <img src={company} className="nav-img" alt="/" />
          <label style={{ color: "white" }}>LinkedIn Lite</label>
        </a>
        <button
          className="btn2"
          onClick={() => {
            navigate("/");
          }}
        >
          Sign up
        </button>
        <section className="links">
          <ul className="nav-ul flex">
            <strong
              style={{
                fontSize: "medium",
                color: "white",
                fontFamily: "cursive",
              }}
            >
              User's Profile
            </strong>
            {name ? (
              <a
                className="bttn2"
                onClick={() => profilePic(name.firstname)}
              >{`${name?.firstname} ${name?.lastname}`}</a>
            ) : (
              <div>
                <li
                  style={{
                    padding: "10px",
                    color: "black",
                    listStyle: "none",
                    fontSize: "large",
                  }}
                >
                  Sign in first
                </li>
              </div>
            )}
          </ul>
        </section>
      </nav>

      <div className="contain container1">
        <form className="listForm flex container1">
          <input
            className="homePost"
            type="text"
            name="text"
            placeholder="Write a Post . . ."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button className="btn" onClick={submitForm}>
            POST
          </button>
          <br />
        </form>

        <div className="answersMain">
          <div className="answers">
            {details.map((value) => (
              <div className="container2" key={value._id}>
                <div>
                  <a
                    style={{ cursor: "pointer" }}
                    className="click"
                    onClick={() => {
                      profilePic(value.user);
                    }}
                  >
                    {value.user}
                  </a>
                </div>

                <h2>{value.post}</h2>
                <h5>{new Date(value.createdAt).toLocaleString()}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
