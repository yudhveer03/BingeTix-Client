import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./NavBar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isVisible ? "" : "hidden"}`}>
      <div className="logo">
        <span>🎬 BingeTix</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/releases">Releases</Link></li>
        {/* <li><Link to="/favorite">Favorites</Link></li> */}
      </ul>

      {/* Right side buttons with clean spacing */}
      <div className="nav-actions">
        <button className="search-btn" aria-label="Search">
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