import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-blue-600 text-white">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl text-white" to="/">Car Renting</Link>
      </div>
      <div className="flex-1 flex justify-center">
        <nav className="flex gap-4">
          <Link className="btn btn-ghost normal-case text-lg text-white" to="/">Home</Link>
          <Link className="btn btn-ghost normal-case text-lg text-white" to="/contact">Contact</Link>
          <Link className="btn btn-ghost normal-case text-lg text-white" to="/about">About Us</Link>
        </nav>
      </div>
      <div className="flex-none gap-8">
        <nav className="flex gap-4">
          <Link className="btn btn-ghost normal-case text-lg text-white" to="/login">Log in</Link>
          <Link className="btn btn-ghost normal-case text-lg text-white" to="/register">Register</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
