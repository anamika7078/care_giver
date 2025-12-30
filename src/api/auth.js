import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Create axios instance with base config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const register = (userData) => {
    return api.post('register', userData);
};

export const login = async (credentials) => {
    console.log('Sending login request with:', {
        url: API_URL + 'login',
        data: {
            email: credentials.email,
            // Don't log the actual password
            password: credentials.password
        }
    });

    try {
        const response = await api.post('login', {
            email: credentials.email.trim(),
            password: credentials.password
        });
        console.log('Login response:', response.data);
        return response;
    } catch (error) {
        console.error('Login error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data
            }
        });
        throw error;
    }
};
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};