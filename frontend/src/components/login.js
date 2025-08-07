import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../web.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [names, setNames] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://minilinkedin-lite.onrender.com/login", form);
      const user = res.data.user;
      alert("login successfull");

      navigate("/home", { state: { name: user } });
    } catch {
      alert("Invalid login credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login flex container1">
      <h1>Login</h1>
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
      <button type="submit" className="btn3">
        Login
      </button>
    </form>
  );
}
