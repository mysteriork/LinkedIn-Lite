import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./loader";
import "../web.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://minilinked-in.onrender.com/api/auth/login",
        form
      );
      const user = res.data.user;
      alert("login successfull"); 
      navigate("/home", { state: { name: user } });
    } catch {
      alert("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="login flex container1">
        <h1>Login</h1>
        <input
          name="username"
          type="text"
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
        <button type="submit" className="btn3">
          Login
        </button>
        <button onClick={() => navigate("/")} className="btn4">
          Register
        </button>
        <p className="resetBtn" onClick={() => navigate("/reset")}>Forgot password</p>
        {loading && <Loader />}
      </form>
    </div>
  );
}
