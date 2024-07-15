import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [userDataName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { userDataName, email, password, isAdmin };

    const response = await fetch("http://localhost:8000/Register", {
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
      setName("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      setError("");
      navigate("/Login");
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', padding: '20px' }}>
    <div className="container my-2">
      <h1 className="h1 text-center">Register</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={userDataName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
      Already have an Account? <a href="/Login">Sign In</a>
    </div>
    </div>
  );
};

export default Create;
