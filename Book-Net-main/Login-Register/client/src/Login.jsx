import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result.data);

       if (result.data.status === "Success") {
               localStorage.setItem("userEmail", email);
               localStorage.setItem("userRole", result.data.role);
              navigate("/home");
      } else {
          setError(result.data.message || "Your email or password is incorrect");
      }

      })
      .catch((err) => {
        console.log(err);
        setError("Your email or password is incorrect");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">BookNet</h1>
        <h2 className="welcome-text">Welcome</h2>
        <p className="subtext">Unlock the stories!</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="or-divider">OR</div>

        <button className="google-button">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Continue with Google
        </button>

        <p className="signup-text">
          Don’t you have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
