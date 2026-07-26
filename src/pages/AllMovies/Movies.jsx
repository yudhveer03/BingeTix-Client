import React, { useState, useEffect } from 'react';
import Movie_Cards from '../../components/MovieCard/Movie_Cards';
import './Movies.css'



const Movie = () => {

  const [movies, setmovies] = useState([])



  useEffect(() => {
    fetch('https://bingetix-server.onrender.com/api/')
      .then(response => response.json())
      .then(data => {
        // console.log("Data Received", data);
        setmovies(data)
      }
      )
      .catch(err => console.log(err))
  }, []);



  return (
    <>
      <h3>Now Showing</h3>

      <div className='card-grid'>
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
        ))
        }
      </div>

    </>
  )
}


export default Movie







// import React, { useState, useEffect } from 'react';

// const Movies = () => {

//   const [movies, setmovies] = useState([]);



//   useEffect(() => {

//     console.log("useEffect Running");

//     fetch('https://bingetix-server.onrender.com/')
//       .then(res => res.json())
//       .then(data => {
//         console.log("DATA RECEIVED:", data);
//         setmovies(data);
//       })
//       .catch(err => console.log(err));

//   }, []);

//   return (
//     <div>
//       <h1>Movies Count: {movies.length}</h1>

//       {movies.map(movie => (
//         <div key={movie._id}>
//           <h2>{movie.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Movies;