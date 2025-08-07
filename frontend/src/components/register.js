import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../web.css"

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    bio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://minilinkedin-lite.onrender.com/register", form);
      alert("Registered ! Please login...");
      navigate("/login");
    } catch (err) {
      alert("Error registering. check CREDENTIALS .");
    }
  };

  return (
    <div className="signup container1 flex">
      {" "}
      <form onSubmit={handleSubmit} className="signForm flex">
        <h1>Register Yourself First</h1>
        <input
          name="firstname"
          placeholder="firstName"
          onChange={handleChange}
          required
        />
        <input
          name="lastname"
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
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="bio"
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn3">Register</button>
      </form>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
        <p style={{color:"green"}}>Already registered ? Then Login here </p>
        <button
          onClick={() => {
            navigate("/login");
          } }
          className="btn4"
        >
          login
        </button>
      </div>
    </div>
  );
}
