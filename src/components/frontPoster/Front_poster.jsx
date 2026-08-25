import React from "react";
import front_picture from "../../assets/main image.png";
import "./Front_poster.css";

const Front_poster = () => {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${front_picture})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          {/* <span className="hero-tag">
            🎬 India's Favourite Movie Booking Platform
          </span> */}

          <h1>
            THE MOVIE <br />
            EXPERIENCE <br />
            STARTS HERE
          </h1>

          <p className="hero-desc">
            Discover the latest blockbusters, reserve your seats instantly,
            and enjoy the ultimate cinema experience.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Browse Movies</button>
            <button className="secondary-btn">Coming Soon</button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <span>Movies</span>
            </div>

            <div>
              <h3>50K+</h3>
              <span>Bookings</span>
            </div>

            <div>
              <h3>100+</h3>
              <span>Theatres</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Front_poster;