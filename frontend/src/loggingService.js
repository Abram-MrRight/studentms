import axios from 'axios';

const logError = async (error) => {
    try {
        await axios.post('http://localhost:3001/api/cyber_school/logs', {
            message: error.message,
            stack: error.stack,
        });
    } catch (logError) {
        console.error('Failed to log error', logError);
    }
};

export default logError;
