import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function NavBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-800 text-white font-oswald">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src="/Nexus Logo.png" alt="Logo" className="h-10 inline-block mr-3" />
        </Link>
      </div>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/about" className="hover:text-blue-300">About</Link>
        <Link to="/schedule" className="hover:text-blue-300">Schedule</Link>
        <Link to="/register" className="hover:text-blue-300">Register</Link>
      </div>
    </div>
  );
}

export default NavBar;
