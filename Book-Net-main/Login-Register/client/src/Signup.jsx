import React from 'react';
import './Signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name,setName]= useState()
    const [email,setEmail]= useState()
    const [password,setPassword]= useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
            console.log(result)
            navigate('/home')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="logo">BookNet</h1>
        <h2>Welcome</h2>
        <p>Join to unlock the stories!</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" 
                 onChange={(e) => setEmail(e.target.value)}/>

          <label>Username</label>
          <input type="text" placeholder="Enter your username" 
                 onChange={(e) => setName(e.target.value)}/>

          <label>Password</label>
          <input type="password" placeholder="Enter your password" 
                 onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <div className="separator">OR</div>

        <button className="google-button">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
          />
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

