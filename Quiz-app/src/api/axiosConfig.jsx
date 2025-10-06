import axios from 'axios';

const api = axios.create({
  baseURL: '/', // Vite proxy will forward requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
