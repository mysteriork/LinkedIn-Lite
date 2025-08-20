import React, { use, useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../web.css";
import { useLocation } from "react-router-dom";
import company from "../components/images/companyTag.png";
import plus from "../components/images/plus.png";
import send from "../components/images/send.png";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navData = useLocation();
  const name = navData.state?.name;

  const [text, setText] = useState("");
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [replies, setReplies] = useState({});
  const [postt, setPostt] = useState([]);

  const handleReplyChange = (postId, value) => {
    setReplies((prev) => ({ ...prev, [postId]: value }));
  };

  const sendReply = async (postId) => {
    const replyText = replies[postId]?.trim();
    if (!replyText) return;

    try {
      const reply = await axios.post(
        "https://linkedin-lite-t1zn.onrender.com/api/posts/cmt",
        { postId, userId: name._id, reply: replyText, name: name.firstname }
      );
      showReply();
      setReplies((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.log("error sending reply", error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append("user", name.firstname);
        formData.append("text", text);
        formData.append("userId", name._id);
        formData.append("image", image);

        await axios.post(
          "https://linkedin-lite-t1zn.onrender.com/api/posts/user",
          formData
        );
        alert("Post has Created !!!");
        setText("");
        setImage(null);
        showData();
        showReply();
      } else {
        await axios.post(
          "https://linkedin-lite-t1zn.onrender.com/api/posts/user",
          {
            user: name.firstname,
            text: text,
            userId: name._id,
          }
        );
        alert("Post has Created !!!");
        setText("");
        setImage(null);
        showData();
        showReply();
      }
    } catch (error) {
      console.log("error sending data on client side", error.message);
    } finally {
      setLoader(false);
    }
  };

  const deletepost = (id) => {
    const confirm = window.confirm("Are you sure , you want to delete this ?");
    if (confirm) {
      axios
        .delete(
          `https://linkedin-lite-t1zn.onrender.com/api/posts/delete/${id}`
        )
        .then((result) => {
          alert("Post deleted !!!");
          showData();
        })
        .catch((err) => {
          alert("Error Deleting Post !");
        });
    }
  };
  const showData = () => {
    axios
      .get(
        "https://linkedin-lite-t1zn.onrender.com/api/posts"
      )
      .then((res) => {
        setDetails(res.data.data);
      })
      .catch((err) => console.log("data not fetched", err.message));
  };

  const showReply = () => {
    axios
      .get(
        "https://linkedin-lite-t1zn.onrender.com/api/posts"
      )
      .then((res) => {
        setPostt(res.data);
      })
      .catch((err) => console.log("replies not fetched", err.message));
  };

  useEffect(() => {
    showData();
    showReply();
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
        <form className="listForm flex container1" onSubmit={submitForm}>
          <section className="homePost">
            <input
              className="homePostt"
              type="text"
              name="text"
              placeholder="Write a Post . . ."
              autoComplete="off"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="imgcontainer">
              <span className="file-upload">
                {image ? image.name : "Upload pic"}
              </span>
              <label htmlFor="fileupload">
                <img src={plus} alt="plusSign" className="plusimg" />
              </label>
              <input
                id="fileupload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
              />
            </div>
          </section>

          <button type="submit" className="btn">
            POST
          </button>
          <br />
        </form>
        <div style={{ marginInline: "auto" }}> {loader && <Loader />}</div>

        <div className="answersMain">
          <div className="answers">
            {details.map((value) => (
              <div className="container2" key={value._id}>
                <div>
                  <div style={{ marginBottom: "5px" }}>
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
                  {value.image && (
                    <div>
                      <img
                        src={value.image}
                        alt="imgPost"
                        className="imgpost"
                      />
                    </div>
                  )}
                  <h5 >{new Date(value.createdAt).toLocaleString()}</h5>
                  <h5 className="replyInp" style={{ color: "goldenrod" }}>
                    comments
                  </h5>
                  <div className="replybox" >
                    {postt.length>0 && postt.map(
                      (valuee) =>
                        value._id === valuee.postId && (
                          <p
                            className="replies"
                            key={valuee._id}
                          >{`${valuee.name} : ${valuee.reply}`}</p>
                        )
                    )}
                  </div>

                  <div>
                    <input
                      autoComplete="off"
                      className="replyInp1"
                      type="text"
                      placeholder="write a comment ..."
                      onChange={(e) =>
                        handleReplyChange(value._id, e.target.value)
                      }
                      value={replies[value._id] || ""}
                    />
                    <label htmlFor="replyBtn">
                      <img
                        src={send}
                        alt="replybtn"
                        className="replyBtn"
                        onClick={() => sendReply(value._id)}
                      />
                    </label>
                    <input style={{ display: "none" }} id="replyBtn" />
                  </div>
                </div>

                {value.userId === name?._id && (
                  <button
                    className="deletebtn"
                    onClick={() => deletepost(value._id)}
                  >
                    delete post
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
