import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';

const MovieList = ({ movies  }) => {
    // console.log('movies');
    // console.log(movies);
    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                pagination={{ clickable: true }} 
                navigation 
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard item={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


export default MovieList;
