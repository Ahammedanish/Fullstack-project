import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === trimmedEmail && u.password === trimmedPassword);

    // Also allow demo admin
    if (user || (trimmedEmail === "admin@gmail.com" && trimmedPassword === "1234")) {
      // save login state
      localStorage.setItem("isLoggedIn", "true");
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }

      // Notify other components of auth change
      window.dispatchEvent(new CustomEvent('authChange'));

      // redirect to intended page or HOME
      const from = location.state?.from || "/";
      navigate(from);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Create Account</Link></p>
    </div>
  );
}

export default Login;
