import React, { useState, useEffect } from 'react';
import Movie_Cards from '../MovieCard/Movie_Cards'
import './CSS Files/RecommMovies.css'

const RecommMovies = () => {

    const [movies, setmovies] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/movies`)
            .then(response => response.json())
            .then(data => {
                // console.log("Data Received", data);
                setmovies(data)
            }
            )
            .catch(err => console.log(err))
    }, []);




    return (
        <div>
            <section className="recommended-section">
                <h2>You May Also Like</h2>

                <div className="movie-grid">
                    {movies.map(movie => (
                        <Movie_Cards
                            key={movie._id}
                            title={movie.title}
                            image={movie.image}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default RecommMovies
