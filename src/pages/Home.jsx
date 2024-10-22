import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import axios from 'axios';
import { fetchMovies } from '../service/movieService';

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingMoviesRes = await fetchMovies('trending');
                const topRatedMoviesRes = await fetchMovies('top_rated');
                setTrendingMovies(trendingMoviesRes);
                setTopRatedMovies(topRatedMoviesRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <HeroSlide />
            <div className="container">
                {/* Trending Movies Section */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                    </div>
                    <MovieList movies={trendingMovies} />
                </div>

                {/* Top Rated Movies Section */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                    </div>
                    <MovieList movies={topRatedMovies} />
                </div>
            </div>
        </>
    );
};

export default Home;
