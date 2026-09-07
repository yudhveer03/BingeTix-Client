import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaPlay } from 'react-icons/fa';
import './Releases.css';
import { useLocation } from 'react-router-dom';

const Releases = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
    const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie/upcoming`);
                setUpcomingMovies(response.data || []);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching movies from backend:", err);
                setError("Failed to load upcoming releases.");
                setIsLoading(false);
            }
        };

        fetchUpcomingMovies();
    }, []);

    useEffect(() => {
  if (location.state && location.state.searchQuery !== undefined) {
    setSearchTerm(location.state.searchQuery);
  } else if (!location.state) {
    setSearchTerm("");
  }
    }, [location]);

    const formatDate = (dateString) => {
        if (!dateString) return "Coming Soon";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        return (
            <div className="releases-container">
                <p className="loading-text">Loading upcoming blockbusters...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="releases-container">
                <p className="error-text">{error}</p>
            </div>
        );
    }

    // Filter the movies based on the search term
    const filteredMovies = upcomingMovies.filter(movie => 
     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Use the filtered array for the featured banner
    const featuredMovie = filteredMovies[0];

    return (
        <div className="releases-container">
            {/* 1. Featured Hero Banner */}
            {featuredMovie && (
                <div
                    className="releases-hero"
                    style={{
                        backgroundImage: `linear-gradient(to right, #050816 40%, rgba(5,8,22,0.4)), url(${TMDB_BACKDROP_BASE}${featuredMovie.backdrop_path})`
                    }}
                >
                    <div className="hero-content">
                        <span className="release-badge">🔥 Releasing {formatDate(featuredMovie.release_date)}</span>
                        <h1>{featuredMovie.title}</h1>
                        <p className="hero-desc">{featuredMovie.overview}</p>

                        <div className="hero-buttons">
                            <button
                                className="btn-trailer"
                                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(featuredMovie.title + ' trailer')}`, '_blank')}
                            >
                                <FaPlay /> Watch Trailer
                            </button>
                            <button className="btn-notify">
                                <FaBell /> Remind Me
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Upcoming Releases Grid */}
            <div className="upcoming-section">
                <h3>Arriving Next</h3>

                <div className="upcoming-grid">
                    {filteredMovies.slice(1).map((movie) => (
                        <div key={movie.id} className="upcoming-card">
                            <div className="card-image-wrapper">
                                <img
                                    src={movie.poster_path ? `${TMDB_POSTER_BASE}${movie.poster_path}` : "https://via.placeholder.com/220x320/091225/ffffff?text=Coming+Soon"}
                                    alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/220x320/091225/ffffff?text=Coming+Soon";
                                    }}
                                />
                                <div className="date-badge">{formatDate(movie.release_date)}</div>
                            </div>

                            <div className="upcoming-info">
                                <h4>{movie.title}</h4>
                                <p>Language: {movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}</p>
                                <button className="btn-card-notify">
                                    <FaBell /> Notify Me
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Releases;