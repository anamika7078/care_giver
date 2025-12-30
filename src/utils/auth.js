// src/utils/auth.js

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const logout = () => {
    removeToken();
    // Clear any other user-related data
    localStorage.removeItem('user');
};