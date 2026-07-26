import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        🎬 <span>FilmCity</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/releases">Releases</Link></li>
        <li><Link to="/favorite">Favorites</Link></li>
      </ul>

      <div className="nav-actions">
        <button className="search-btn">
          <FaSearch />
        </button>

        <button className="login-btn">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;