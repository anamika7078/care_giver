// src/services/api/caregiverServices.js
import api from './api';
import { logout } from '../../utils/auth';

export const getCaregivers = async () => {
    try {
        const response = await api.get('/caregivers');
        return response.data;
    } catch (error) {
        console.error('Error fetching caregivers:', error);
        if (error.response) {
            if (error.response.status === 401) {
                // If unauthorized, clear auth and redirect to login
                logout();
                window.location.href = '/login';
            } else if (error.response.status === 403) {
                // If forbidden, show a user-friendly message
                throw new Error('You do not have permission to view caregivers. Please contact an administrator.');
            }
        }
        throw error;
    }
};

export const getActiveCaregivers = async () => {
    try {
        const response = await api.get('/caregivers/active');
        return response.data;
    } catch (error) {
        console.error('Error fetching active caregivers:', error);
        if (error.response?.status === 403) {
            throw new Error('You do not have permission to view active caregivers.');
        }
        throw error;
    }
};
// In caregiverServices.js
export const getAvailableCaregivers = async () => {
    try {
        const response = await api.get('/caregivers/available');
        return response.data;
    } catch (error) {
        console.error('Error fetching available caregivers:', error);
        if (error.response?.status === 401) {
            logout();
            window.location.href = '/login';
        }
        throw error;
    }
};