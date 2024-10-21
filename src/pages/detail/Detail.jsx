import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/movie-details/${id}`);
                console.log(response.data);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <>
            {/* <h1>{movie?.movie?.name}</h1> */}
            <div className="banner" style={{ backgroundImage: `url(${movie?.movie?.thumb_image_url})` }}></div>
            <div className="mb-3 movie-content container">
                <div className="movie-content__poster">
                    <div className="movie-content__poster__img" style={{ backgroundImage: `url(${movie?.movie?.thumb_image_url})` }}></div>
                </div>
                <div className="movie-content__info">
                    <h1 className="title">
                        {movie?.movie?.name}
                    </h1>
                    <div className="genres">
                        {
                            movie && movie?.movie.type_names && movie?.movie.type_names.slice(0, 5).map((genre, i) => (
                                <span key={i} className="genres__item">{genre}</span>
                            ))
                        }
                    </div>
                    <p className="overview">{movie?.movie.description}</p>

                    <div className="cast">
                        <div className="section__header">
                            <h2>Casts</h2>
                        </div>
                        <p>{movie?.movie.casting}</p>
                    </div>
                    <div className="download">
                        <Link className='genres__item'>Download</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
