
// src/services/movieService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchMovies = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies-list?${type}=true`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const searchMoviesService = async (searchInput) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search-movies/${searchInput}`);
        return response.data; // Return the search results
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};
