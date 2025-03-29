import React from "react";

import "./CSS/Login.css"; // Import custom styles

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_OAUTH_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box text-center">
        <h2 className="mb-3">Welcome to <span className="text-primary">EcoMotoPlan</span></h2>
        <p className="text-muted my-2">Log in to plan your trips effortlessly!</p>
        <button onClick={handleLogin} className="btn btn-primary btn-lg w-100 my-2">
          <i className="fab fa-google me-2"></i> Login with Google
        </button>
        <p className="mt-3 text-secondary">
          By logging in, you agree to our <span className="text-primary cursor-pointer">Terms & Privacy</span>.
        </p>
      </div>
    </div>
  );
}
