import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Front_poster from '../../components/frontPoster/Front_poster'
import Movies from '../AllMovies/Movies'
import Movie_Cards from '../../components/MovieCard/Movie_Cards';
import './Home.css'

const Home = () => {

  const [movies, setmovies] = useState([])

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://bingetix-server.onrender.com/api/movie')
      console.log("Data Received", response.data);
      setmovies(response.data);
    }
    catch (err) {
      console.log("API fetch failed", err);

    }
  }
  useEffect(() => {
    fetchMovies();
  }, [])



  return (
    <div>
      <Front_poster />
      <br></br>
      <br></br>

      <h3>Now Showing</h3>


      <div className='movie-slider'>
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

    </div>

  )
}

export default Home
