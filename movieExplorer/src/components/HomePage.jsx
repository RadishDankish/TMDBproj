// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { getPopularMovies, searchMovies } from '../tmdb';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchMovies = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedMovies = query
                ? await searchMovies(query)
                : await getPopularMovies();
            setMovies(fetchedMovies);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch movies. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [fetchMovies, searchTerm]);

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Popular Movies'}
            </h1>

            <SearchBar onSearch={handleSearch} />

            {error && (
                <p className="text-red-400 text-center my-4">{error}</p>
            )}

            {loading ? (
                <p className="text-gray-400 text-center my-4">Loading movies...</p>
            ) : movies.length === 0 ? (
                <p className="text-center text-gray-400 text-lg">No movies found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={(id) => navigate(`/movie/${id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
