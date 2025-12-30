// FRONTEND/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (email, password) => api.post('/auth/login', { email, password }),
    getMe: () => api.get('/auth/me'),
};

// Bookings API
export const bookingsAPI = {
    getBookings: () => api.get('/bookings'),
    createBooking: (bookingData) => api.post('/bookings', bookingData),
    getBooking: (id) => api.get(`/bookings/${id}`),
    updateBooking: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
    deleteBooking: (id) => api.delete(`/bookings/${id}`),
};

// Admin API
export const adminAPI = {
    getUsers: () => api.get('/admin/users'),
    createUser: (userData) => api.post('/admin/users', userData),
    getUser: (id) => api.get(`/admin/users/${id}`),
    updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

// Staff API
export const staffAPI = {
    getStaff: () => api.get('/staff'),
    createStaff: (staffData) => api.post('/staff', staffData),
    getStaffMember: (id) => api.get(`/staff/${id}`),
    updateStaff: (id, staffData) => api.put(`/staff/${id}`, staffData),
    deleteStaff: (id) => api.delete(`/staff/${id}`),
};

// Documents API
export const documentsAPI = {
    getDocuments: () => api.get('/documents'),
    uploadDocument: (formData) => {
        // For file uploads, we need to set the content type to multipart/form-data
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return api.post('/documents', formData, config);
    },
    getDocument: (id) => api.get(`/documents/${id}`),
    updateDocument: (id, formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return api.put(`/documents/${id}`, formData, config);
    },
    deleteDocument: (id) => api.delete(`/documents/${id}`),
};

export default api;