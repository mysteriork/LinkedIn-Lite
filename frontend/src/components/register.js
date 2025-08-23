import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./loader";
import "../web.css";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    bio: "",
  });
  const [loading,setLoading]=useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await axios.post(
        "https://minilinked-in.onrender.com/api/auth/register"
        ,
        form
      );
      console.log("Registered successfully");
      
      alert("Registered ! Please login...");
      navigate("/login");
    } catch (err) {
      alert("Error registering. check CREDENTIALS .");
      console.log("error registering");
      
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="signup container1 flex">
      {" "}
      <form onSubmit={handleSubmit} className="signForm flex">
        <h1>Register Yourself First</h1>
        <input
          name="firstname"
          autoComplete="off"
          placeholder="firstName"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
          autoComplete="off"
          placeholder="lastName"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="username"
          type="text"
          autoComplete="off"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="bio"
          autoComplete="off"
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn3">
          Register
        </button>
        {loading && <Loader/>}
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <p style={{ color: "green" }}>Already registered ? Then Login here </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="btn4"
        >
          login
        </button>
      </div>
    </div>
  );
}
