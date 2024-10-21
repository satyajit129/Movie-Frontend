import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import axios from 'axios';

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    // Fetch all categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trendingMoviesRes = await axios.get('http://127.0.0.1:8000/api/movies-list?trending=true');
                const topRatedMoviesRes = await axios.get('http://127.0.0.1:8000/api/movies-list?top_rated=true');
                setTrendingMovies(trendingMoviesRes.data);
                setTopRatedMovies(topRatedMoviesRes.data);
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
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList movies={trendingMovies} />
                </div>

                {/* Top Rated Movies Section */}
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList movies={topRatedMovies} />
                </div>
            </div>
        </>
    );
};

export default Home;
