import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie_Cards from '../../components/MovieCard/Movie_Cards';
import './Movies.css';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';


const Movies = () => {

  const [searchTerm,setSearchTerm] = useState("")
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie?q=${searchTerm}`);
        setMovies(response.data);
        setIsLoading(false);
      }
      catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

 useEffect(() => {
  // Check if searchQuery exists in the state (even if it is an empty string "")
  if (location.state && location.state.searchQuery !== undefined) {
    setSearchTerm(location.state.searchQuery);
  } else if (!location.state) {
    // If they clicked the normal "Movies" link in the nav, reset the search
    setSearchTerm("");
  }
}, [location]);

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