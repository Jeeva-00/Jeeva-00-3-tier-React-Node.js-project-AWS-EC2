import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container fade-in not-found">
      <img  alt="DevOps Shack logo" className="logo" />
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}

export default NotFound;
