import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AboutMovie from '../../components/MovieDetails/AboutMovie.jsx';
import './MovieDetails.css';
import TrailerSection from '../../components/MovieDetails/TrailerSection';
import RecommMovies from '../../components/MovieDetails/RecommMovies';

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://bingetix-server.onrender.com/api/movie/${id}`);
        setDetails(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!details) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="first-section">
        <AboutMovie movie={details} />
      </div>

      <TrailerSection movie={details} />
      <RecommMovies movies={details} />
    </>
  );
};

export default MovieDetails;