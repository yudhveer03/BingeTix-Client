  import React, { useState, useEffect } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { FaMagnifyingGlass } from "react-icons/fa6";
  import "./NavBar.css";
  import { useAuthModal } from "../../context/AuthModalContext";
  import { useAuth } from "../../context/AuthContext";
  import socket from "../../services/socket";
  import { useNavigate } from "react-router-dom";
  import { useRef } from "react";



  const Navbar = () => {

    const location = useLocation();
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();
    const [searchExpanded, setSearchExpanded] = useState(false)
    const [navSearchTerm, setNavSearchTerm] = useState("")

    useEffect(()=> {
      socket.on("connect", () => {
        console.log("Frontend Socket is successfully connected!");
      })
      
      return () => {
        socket.off();
    }
    
    },[]) 

    const { isLoggedIn, logout } = useAuth();
    const { openModal } = useAuthModal();
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


    useEffect(() => {
    
    const handleClickOutside = (event) => {
      // If the ref exists AND the click target is NOT inside our ref boundary...
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchExpanded(false); // Close the search bar!
      }
    };

    // 2. Tell the browser to start listening for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // 3. Cleanup: Tell the browser to stop listening when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
          <div ref={searchContainerRef} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

          <button onClick={() => setSearchExpanded(true)}
          className="search-btn" aria-label="Search">
            <FaMagnifyingGlass />
            </button>
            
            <input
              className={`nav-search-input ${searchExpanded ? "expanded" : ""}`}
              value={navSearchTerm}
              onChange={(e) => {
                setNavSearchTerm(e.target.value);
                // Route the search based on the current page!
                if (location.pathname === "/releases") {
                  navigate("/releases", { state: { searchQuery: e.target.value } });
                } else {
                  navigate("/movies", { state: { searchQuery: e.target.value } });
                }
              }}/> 
          </div>
          
          {isLoggedIn ? <button onClick={logout}>Logout</button> : <button onClick={() => { openModal('default') }}>Login</button>}
        </div>
      </nav>
    );
  };

  export default Navbar;