// src/services/movieService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/movie-details';

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};