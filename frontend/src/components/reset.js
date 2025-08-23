import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../web.css"

function Reset() {
  const navigate=useNavigate()
  const [newPass, setNewPass] = useState({
    newPword: "",
    password: "",
  });
  const handleChange = (e) => {
    setNewPass({
      ...newPass,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = (e) => {
    e.preventDefault();
    try {
      axios.post(
        "https://minilinked-in.onrender.com/api/auth/reset",
        newPass
      );
      alert("Password Reset done ... LOGIN again !!!");
      navigate("/login")
    } catch (error) {
      alert("Error in reseting password");
      navigate("/login")
    }
  };

  return (
    <div>
      <form onSubmit={changePassword} className="reset flex container1">
        <h1>Enter New Password</h1>
        <input
          name="newPword"
          type="text"
          autoComplete="off"
          placeholder="Username..."
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="text"
          autoComplete="off"
          placeholder="new Password..."
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn3">
          Reset
        </button>
        <button onClick={()=>navigate("/login") } className="btn4">GO BACK</button>
      </form>
    </div>
  );
}

export default Reset;
