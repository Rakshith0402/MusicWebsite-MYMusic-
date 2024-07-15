import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    alert("Successful logout");
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          MyMusic
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
           
            {user ? (
              <>
                {user.role === 'admin' && <Link className="nav-link" to="/upload">Upload</Link>}
                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                <Link className="nav-link active" aria-current="page" to="/play">Play</Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/Login">Login</Link>
                <Link className="nav-link" to="/Register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
