import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './CSS Files/Movie_info.css'



const Movie_info = ( {movie}) => {





  return (
    <div className="seat-movie-card">

      <div className="seat-poster">
        <img src={movie.image} alt={movie.title} />
      </div>

      <div className="seat-movie-info">

        <h1>{movie.title}</h1>

        <div className="seat-rating">
          ⭐ {movie.rating}/10
        </div>

        <div className="seat-tags">
          <span>{movie.genre}</span>
          <span>{movie.time}</span>
        </div>

        <p className="seat-description">
          {movie.description}
        </p>

        <div className="movie-meta">

          <div>
            <h4>Director</h4>
            <p>{movie.director}</p>
          </div>

          <div>
            <h4>Language</h4>
            <p>{movie.language}</p>
          </div>

          <div>
            <h4>Release Date</h4>
            <p>{movie.releaseDate}</p>
          </div>

          <div>
            <h4>Cast</h4>
            <p>{movie.cast?.join(", ")}</p>
          </div>

        </div>

      </div>

      {/* <div className="book-btn-container">
        <button className="seat-book-btn">
          Book Now
        </button>
      </div> */}

    </div>
  );
};

export default Movie_info;