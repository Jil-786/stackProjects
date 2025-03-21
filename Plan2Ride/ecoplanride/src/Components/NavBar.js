import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar({ title, user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/auth/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-lg font-bold" to="/">
          {title}
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/suggest">Suggestions</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item d-flex align-items-center">
                {/* Profile Picture (Optional) */}
                {/* {user.picture && (
                  <img src={user.picture} alt="Profile" className="rounded-circle me-2" width="40" height="40" />
                )} */}
                <span className="nav-link text-white me-3">
                  {user.name} | Tokens: <strong>{user.token}</strong>
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="btn btn-primary" to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}