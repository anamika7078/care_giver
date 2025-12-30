import axios from 'axios';
import { getToken } from '../../utils/auth';
// Create axios instance with base URL
const api = axios.create({
   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle different status codes
            if (error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    }
);
api.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
export default api;
