import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import { fetchMovies } from '../../service/movieService';

const Header = () => {
    const headerRef = useRef(null);

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const location = useLocation();

    // console.log(currentUrl);
    
    useEffect(() => {
        const fetchTrendingAndTopRated = async () => {
            try {
                const trendingMoviesRes = await fetchMovies('trending');
                const topRatedMoviesRes = await fetchMovies('top_rated');
                setTrendingMovies(trendingMoviesRes);
                setTopRatedMovies(topRatedMoviesRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTrendingAndTopRated();
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <Link to="/">Roy</Link>
                </div>
                <ul className="header__nav">
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                            Home 
                        </Link>
                    </li>
                    <li>
                        <Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>
                            Trending 
                        </Link>
                    </li>
                    <li>
                        <Link to="/top-rated" className={location.pathname === '/top-rated' ? 'active' : ''}>
                            Top Rated 
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
