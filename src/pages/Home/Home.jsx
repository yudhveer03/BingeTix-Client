import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Front_poster from '../../components/frontPoster/Front_poster';
import Movie_Cards from '../../components/MovieCard/Movie_Cards';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie`);
        setMovies(response.data);
        setIsLoading(false); // Turn off loading when data arrives
      } catch (err) {
        console.error("API fetch failed", err);
        setError("Failed to load movies. Please try again later.");
        setIsLoading(false); // Turn off loading even if there is an error
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      <Front_poster />

      <div className="now-showing-section">
        <h3 className="section-title">Now Showing</h3>

        {/* Conditional Rendering based on state */}
        {isLoading ? (
          <h4 className="loading-text">Loading blockbuster movies...</h4>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="movie-slider">
            {movies.map(movie => (
              <Movie_Cards
                key={movie._id}
                id={movie._id}
                title={movie.title}
                image={movie.image}
                rating={movie.rating}
                genre={movie.genre}
                time={movie.time}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;