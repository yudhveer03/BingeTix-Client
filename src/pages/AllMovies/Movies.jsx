import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie_Cards from '../../components/MovieCard/Movie_Cards';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // FIXED: Pointing to the correct /api/movie endpoint
        const response = await axios.get('https://bingetix-server.onrender.com/api/movie');
        setMovies(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page-container">
      <h3>All Movies</h3>

      {isLoading ? (
        <p className="loading-text">Loading movies...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="card-grid">
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
  );
};

export default Movies;