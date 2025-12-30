import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Add a new family member
export const addFamilyMember = async (familyMemberData) => {
    try {
        // Transform the form data to match backend expectations
        const {
            userId,
            elderId,
            relationship,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            bloodGroup,
            phoneNumber,
            email,
            address,
            city,
            state,
            zipCode,
            emergencyContact,
            medicalHistory,
            isPrimary = false,
            canViewMedical = true,
            canEditProfile = true,
            canBookServices = true,
            permissions = {}
        } = familyMemberData;

        // Prepare the request data with required fields at the top level
        const requestData = {
            userId,
            elderId,
            relationship,
            permissions: {
                isPrimary,
                canViewMedical,
                canEditProfile,
                canBookServices,
                ...permissions
            },
            // Include additional details as metadata
            memberDetails: {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                bloodGroup,
                phoneNumber,
                email,
                address,
                city,
                state,
                zipCode,
                emergencyContact,
                medicalHistory
            }
        };

        console.log('Sending family member data:', requestData);

        const response = await axios.post(`${API_URL}/family-members`, requestData, {
            headers: getAuthHeader()
        });

        console.log('Family member added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in addFamilyMember:', error);
        throw error.response?.data?.message || 'Failed to add family member';
    }
};

// Get all family members for an elder
export const getFamilyMembers = async (elderId) => {
    try {
        const response = await axios.get(
            `${API_URL}/elders/${elderId}/family-members`,
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch family members';
    }
};

// Update family member permissions
export const updateFamilyMember = async (id, updateData) => {
    try {
        const response = await axios.put(
            `${API_URL}/family-members/${id}`,
            updateData,
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update family member';
    }
};

// Remove a family member
export const removeFamilyMember = async (id) => {
    try {
        const response = await axios.delete(
            `${API_URL}/family-members/${id}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to remove family member';
    }
};

// Search for users to add as family members
export const searchUsers = async (query) => {
    try {
        const response = await axios.get(
            `${API_URL}/users/search?q=${encodeURIComponent(query)}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to search users';
    }
};
