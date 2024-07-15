import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { email, password };

    const response = await fetch("http://localhost:8000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
      
    } else {
      onLogin(result); // Call onLogin with user data
      navigate("/Play");
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', padding: '20px' }}>
    <div className="container my-2">
      <h1 className="h1 text-center">Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      Don't have an Account? <a href="/Create">Sign Up</a>
    </div>
    </div>
  );
};

export default Login;
