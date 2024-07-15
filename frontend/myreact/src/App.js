import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Play from './components/Play';
import Create from './components/Create';
import Login from './components/Login';
import UploadMusic from './components/UploadMusic'; // Ensure the correct import path

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
        <Route path="/Register" element= {<Create/>}/> 
np,        <Route
          path="/upload"
          element={
            user && user.role === 'admin' ? <UploadMusic /> : <div>Access Denied</div>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/Play" element={user?<Play />:<div>Access Denied</div>} />
      </Routes>
    </Router>
  );
};

export default App;
