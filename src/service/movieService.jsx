// src/services/movieService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/movies-list';

export const fetchMovies = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?${type}=true`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};