import React, { useEffect, useState } from 'react'
import './CSS Files/AboutMovie.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';



const AboutMovie = () => {

  const navigate = useNavigate()

  const { id } = useParams();
  const [movie, setMovie] = useState(null);



  useEffect(() => {
    fetch(`${ import.meta.env.VITE_API_URL }/api/movie/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);


  if (!movie) {
    return <h2>Loading...</h2>;
  }


  return (

    <div className='movie-details'>


      <div className="poster">
        <img src={movie.image} alt='Movie_image' />
      </div>

      <div className='movie-info'>

        <h1> {movie.title}</h1>


        <div className='rating'>
          ⭐ {movie.rating}
        </div>

        <div className='genre-tags'>
          <span>{movie.genre}</span>
        </div>

        <div className='duration'>
          <p>{movie.time}</p>
        </div>

        <div className='description'>
          {movie.description}
        </div>



        <div className='other-info'>

          <p>
            <strong>Director:</strong> {movie.director}
          </p>

          <p>
            <strong>Language:</strong> {movie.language}
          </p>

          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>

          <p>
            <strong>Cast:</strong>
            {" "}
            {movie.cast?.join(", ")}
          </p>

        </div>

        <button className='book-btn' onClick={() => navigate(`/seatSelection/${movie._id}`)}>Book Now</button>

      </div>
    </div>


  )
}

export default AboutMovie
