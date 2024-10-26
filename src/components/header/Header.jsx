import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import { fetchMovies, searchMoviesService } from '../../service/movieService';
import CustomModal from './../modal/CustomModal';

const Header = () => {
    const headerRef = useRef(null);
    const contentRef = useRef(null); // Reference for the main content
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const location = useLocation();

    const toggleHamburger = () => {
        setMobileMenuOpen(prevState => {
            // Update content margin when menu opens or closes
            if (contentRef.current) {
                contentRef.current.classList.toggle('menu-open', !prevState);
            }
            return !prevState;
        });
    };

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

    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            const searchInputValue = document.getElementById('search-box').value;
            if (searchInputValue !== '') {
                const response = await searchMoviesService(searchInputValue);
                setShowModal(true);
                setSearchInput(response);
            } else {
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const searchSmallMovies = async (e) => {
        e.preventDefault();
        try {
            const searchInputValue = document.getElementById('search-box-small').value;
            if (searchInputValue !== '') {
                const response = await searchMoviesService(searchInputValue);
                setShowModal(true);
                setSearchInput(response);
            } else {
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Create an array of nav links
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/trending', label: 'Trending' },
        { to: '/top-rated', label: 'Top Rated' }
    ];

    const renderNavLinks = (isMobile = false) => {
        return navLinks.map(link => (
            <li key={link.to}>
                <Link
                    to={link.to}
                    className={location.pathname === link.to ? 'active' : ''}
                    onClick={isMobile ? toggleHamburger : undefined}
                >
                    {link.label}
                </Link>
            </li>
        ));
    };

    return (
        <>
            <div ref={headerRef} className={`header ${mobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="header__wrap container">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                        <Link to="/">Roy</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className={`header__nav ${mobileMenuOpen ? 'active' : ''}`}>
                        {renderNavLinks()}
                    </ul>

                    {/* Search Icon and Search Box */}
                    <div className="header__search">
                        <div className={`search-box-container ${showSearch ? 'active' : ''}`}>
                            <input
                                type="text"
                                id="search-box"
                                placeholder="Search..."
                                className="search-input"
                                onChange={searchMovies}
                            />
                        </div>
                    </div>
                </div>

                {/* Hamburger Menu */}
                <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`} onClick={toggleHamburger}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Mobile Navigation */}
                <ul className={`header__nav_small ${mobileMenuOpen ? 'visible' : ''}`}>
                    {renderNavLinks(true)}
                </ul>
                <div className="header__search_small">
                    <div className={`search-box-container ${showSearch ? 'active' : ''}`}>
                        <input
                            type="text"
                            id="search-box-small"
                            placeholder="Search..."
                            className="search-input"
                            onChange={searchSmallMovies}
                        />
                    </div>
                </div>
            </div>

            <CustomModal show={showModal} closeModal={closeModal}>
                {Array.isArray(searchInput) && searchInput.length > 0 ? (
                    <div className="search-movie-list">
                        {searchInput.map((movie) => {
                            const link = `/movie-details/${movie.id}`;

                            return (
                                <div key={movie.id} className="movie-item unique-movie-class">
                                    <Link to={link} onClick={closeModal}>
                                        <img
                                            src={movie.thumb_image_url}
                                            alt={movie.name}
                                            className="movie-thumbnail"
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no-results">No results found.</p>
                )}
            </CustomModal>
        </>
    );
};

export default Header;
