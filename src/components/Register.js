import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === email.trim());
    if (existingUser) {
      alert("User already exists");
      return;
    }

    // Add new user
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim()
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // Auto login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Notify other components of auth change
    window.dispatchEvent(new CustomEvent('authChange'));

    navigate("/");
  };

  return (
    <div className="login-page">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;
