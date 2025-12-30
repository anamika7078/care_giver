// F:\React\family_caregive\FRONTEND\src\api\invoice.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Update this with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
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

// Get all invoices
export const getInvoices = async (params = {}) => {
    try {
        const response = await api.get('/invoices', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get single invoice
export const getInvoice = async (id) => {
    try {
        const response = await api.get(`/invoices/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Create new invoice
export const createInvoice = async (invoiceData) => {
    try {
        const response = await api.post('/invoices', invoiceData);
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

// Update invoice
export const updateInvoice = async (id, invoiceData) => {
    try {
        const response = await api.put(`/invoices/${id}`, invoiceData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete invoice
export const deleteInvoice = async (id) => {
    try {
        const response = await api.delete(`/invoices/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Generate PDF
export const generatePdf = async (id) => {
    try {
        const response = await api.get(`/invoices/${id}/pdf`, {
            responseType: 'blob', // Important for file downloads
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    generatePdf,
};