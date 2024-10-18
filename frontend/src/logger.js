// src/logger.js
import axios from 'axios';

const logError = async (message) => {
    try {
        await axios.post('http://localhost:5000/logs', { message });
    } catch (error) {
        console.error("Logging failed", error);
    }
};

export default {
    logError,
};
