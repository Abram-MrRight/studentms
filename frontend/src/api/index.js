import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/cyber_school',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
