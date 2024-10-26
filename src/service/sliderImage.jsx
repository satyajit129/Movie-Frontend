// src/services/movieService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/slider-image';

export const fetchSliders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};