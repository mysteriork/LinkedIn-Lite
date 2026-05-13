import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../web.css";
import company from "../components/images/lin1.png";
import plus from "../components/images/plus.png";
import send from "../components/images/send.png";
import Bin from "../components/images/bin.png";
import Loader from "./loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

function Home() {
  const { userData: name, logout: logOut } = useAuth();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [replies, setReplies] = useState({});
  const [postt, setPostt] = useState([]);
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const logout = () => {
    logOut();
    navigate("/");
  };

  useEffect(() => {
    if (name) {
      showData(page, debounce);
      showReply();
    }
  }, [name?._id, name, page, debounce]);

  const handleReplyChange = (postId, value) => {
    setReplies((prev) => ({ ...prev, [postId]: value }));
  };

  const sendReply = async (postId) => {
    const replyText = replies[postId]?.trim();
    if (!replyText) return;

    try {
      await axios.post("https://minilinked-in.onrender.com/api/posts/cmt", {
        postId,
        userId: name._id,
        reply: replyText,
        name: name.firstname,
      });

      setReplies((prev) => ({ ...prev, [postId]: "" }));
      showReply();
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
          "https://minilinked-in.onrender.com/api/posts/user",
          formData,
        );

        alert("Post has Created !!!");
        setText("");
        setImage(null);
        showData(page, debounce);
        showReply();
      } else {
        await axios.post("https://minilinked-in.onrender.com/api/posts/user", {
          user: name.firstname,
          text: text,
          userId: name._id,
        });

        alert("Post has Created !!!");
        setText("");
        setImage(null);
        showData(page, debounce);
        showReply();
      }
    } catch (error) {
      console.log("error sending data on client side", error.message);
    } finally {
      setLoader(false);
    }
  };

  const deletepost = async (id) => {
    const confirm = window.confirm("Are you sure , you want to delete this ?");
    if (confirm) {
      try {
        await axios
          .delete(`https://minilinked-in.onrender.com/api/posts/delete/${id}`)
          .then((result) => {
            alert("Post deleted !!!");
            showData(page, debounce);
          })
          .catch((err) => {
            alert("Error Deleting Post !");
          });
      } catch (error) {
        console.log("error deleting post", error.message);
      }
    }
  };

  const showData = async (pageNumber = 1, searchValue = "") => {
    try {
      await axios
        .get(
          `https://minilinked-in.onrender.com/api/postspage=${pageNumber}&search=${searchValue}`,
        )
        .then((res) => {
          setDetails(res.data.data);
          setPage(res.data.currentPage);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log("data not fetched", err.message));
    } catch (error) {
      console.log("error fetching data", error.message);
    }
  };

  const showReply = async () => {
    try {
      await axios
        .get(
          "https://minilinked-in.onrender.com/api/posts/cmt"
          
        )
        .then((res) => {
          setPostt(res.data);
        })
        .catch((err) => console.log("replies not fetched", err.message));
    } catch (error) {
      console.log("error fetching replies", error.message);
    }
  };

  const profilePic = (namee) => {
    navigate("/profile", { state: { profilename: namee } });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debounce]);

  const groupReplies = useMemo(() => {
    return postt.reduce((acc, reply) => {
      if (!acc[reply.postId]) {
        acc[reply.postId] = [];
      }
      acc[reply.postId].push(reply);
      return acc;
    }, {});
  }, [postt]);

  return (
    <div>
      <nav className="navbar1 flex">
        <article className="nav-article">
          <a href="/home" className="imagesection">
            <img src={company} className="nav-img" alt="/" />
            <label
              style={{
                color: "white",
                fontSize: "large",
                fontWeight: "600",
                fontFamily: "Arial",
              }}
            >
              <strong>LinkedIn</strong> lite
            </label>
          </a>
          <button
            className="btn2"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign up
          </button>
        </article>
        <section className="links">
          <ul className="nav-ul flex">
            <strong
              style={{
                fontSize: "medium",
                color: "white",
                fontFamily: "Arial",
              }}
            ></strong>
            {name ? (
              <div className="bttn2-div">
                <button
                  className="bttn2"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  {`${name?.firstname} ${name?.lastname}`}

                  {menuOpen && (
                    <div className="dropdown">
                      <button
                        className="drop-item"
                        onClick={() => profilePic(name.firstname)}
                      >
                        Profile
                      </button>
                      <button className="drop-item" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  )}
                </button>
              </div>
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
        <div className="searchSection">
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="search username . . ."
            id="searchBar"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="searchBtn">search</button>
        </div>

        <form className="listForm flex container1" onSubmit={submitForm}>
          <section className="homePost">
            <input
              className="homePostt"
              type="text"
              name="text"
              placeholder="What's in your Mind . . ."
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
        <div style={{ marginInline: "auto", marginTop: "20px" }}>
          {" "}
          {loader && <Loader />}
        </div>
        <div className="answersMain">
          <div className="answers">
            {details.map((value) => (
              <div className="container2" key={value._id}>
                <div id="hero">
                  <div style={{ marginBottom: "20px" }}>
                    <button
                      style={{ cursor: "pointer" }}
                      className="click"
                      onClick={() => profilePic(value.user)}
                    >{`@${value.user}`}</button>
                  </div>
                  <h2>{value.post}</h2>
                  {value.image && (
                    <div className="impPost1">
                      <img
                        src={value.image}
                        alt="imgPost"
                        className="imgpost"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h5 className="dateFont" style={{ marginTop: "5px" }}>
                    {new Date(value.createdAt).toLocaleString()}
                  </h5>
                  <h5 className="replyInp" style={{ color: "goldenrod" }}>
                    comments
                  </h5>
                  <div
                    className="replybox"
                    style={{
                      borderBottom:
                        groupReplies[value._id]?.length >= 5
                          ? ".2px solid lightgray"
                          : "none",
                    }}
                  >
                    {postt &&
                      postt.length > 0 &&
                      groupReplies[value._id]?.map((valuee) => (
                        <p className="replies" key={valuee._id}>
                          <label className="replyTag">{`${valuee.name}:`}</label>
                          {valuee.reply}
                        </p>
                      ))}
                  </div>

                  <div id="commentSection">
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
                        onMouseDown={() => sendReply(value._id)}
                      />
                    </label>
                    <input style={{ display: "none" }} id="replyBtn" />
                  </div>
                </div>

                {value.userId === name?._id && (
                  <button
                    className="deletebtn"
                    title="Delete post"
                    onClick={() => deletepost(value._id)}
                  >
                    <img src={Bin} alt="deletePost" className="bin" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="pagination">
          <button
            className="btnP"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="btnP"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h3>LinkedIn Lite</h3>
            <p>a clone to understand the working of LinkedIn</p>
          </div>

          <div className="footer-links">
            <a href="/home">Home</a>
            <a>Profile</a>
            <a href="/">Login</a>
          </div>

          <div className="footer-copy">
            <p>© 2026 LinkedIn Lite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
