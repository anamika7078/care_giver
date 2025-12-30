import api from './api';

const caregiverAPI = {
    // Add a new caregiver
    // In FRONTEND/src/services/caregiverAPI.js

    addCaregiver: async (caregiverData) => {
        try {
            console.log('Starting caregiver registration with data:', caregiverData);

            // 1. First, prepare the user registration data
            const userData = new FormData();
            userData.append('firstName', caregiverData.firstName || '');
            userData.append('lastName', caregiverData.lastName || '');
            userData.append('email', caregiverData.email || '');
            userData.append('phone', caregiverData.phone || '');
            userData.append('password', caregiverData.password || 'Caregiver@123');
            userData.append('confirmPassword', caregiverData.confirmPassword || 'Caregiver@123');
            userData.append('role', 'caregiver');

            // 2. Register the user
            console.log('Registering user with data:', Object.fromEntries(userData.entries()));
            const registerResponse = await api.post('/auth/register', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('User registered successfully:', registerResponse.data);

            // 3. Get the user ID from the registration response
            const userId = registerResponse.data.user.id;

            // 4. Prepare caregiver profile data
            const caregiverProfile = new FormData();

            // Add all caregiver fields
            const caregiverFields = [
                'specialization', 'experience', 'bio', 'availability',
                'status', 'skills', 'dateOfBirth', 'address', 'city',
                'state', 'zipCode', 'emergencyContact', 'emergencyPhone',
                'hourlyRate', 'languages', 'certifications'
            ];

            // Add the userId to the caregiver profile
            caregiverProfile.append('userId', userId);

            caregiverFields.forEach(field => {
                if (caregiverData[field] !== undefined && caregiverData[field] !== null) {
                    if (field === 'skills' && Array.isArray(caregiverData[field])) {
                        caregiverProfile.append(field, JSON.stringify(caregiverData[field]));
                    } else {
                        caregiverProfile.append(field, caregiverData[field] || '');
                    }
                }
            });

            // 5. Create caregiver profile
            console.log('Creating caregiver profile with data:', Object.fromEntries(caregiverProfile.entries()));
            const caregiverResponse = await api.post('/caregivers', caregiverProfile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Caregiver profile created successfully:', caregiverResponse.data);
            return caregiverResponse.data;

        } catch (error) {
            console.error('Error in addCaregiver:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            throw error;
        }
    },
    // Get all caregivers
    getCaregivers: async () => {
        try {
            const response = await api.get('/admin/caregivers');
            return response.data;
        } catch (error) {
            console.error('Error fetching caregivers:', error);
            throw error;
        }
    },

    // Get single caregiver by ID
    getCaregiver: async (id) => {
        try {
            const response = await api.get(`/admin/caregivers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching caregiver:', error);
            throw error;
        }
    },

    // Update caregiver
    updateCaregiver: async (id, caregiverData) => {
        try {
            const response = await api.put(`/admin/caregivers/${id}`, caregiverData);
            return response.data;
        } catch (error) {
            console.error('Error updating caregiver:', error);
            throw error;
        }
    },  

    // Delete caregiver
    deleteCaregiver: async (id) => {
        try {
            const response = await api.delete(`/admin/caregivers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting caregiver:', error);
            throw error;
        }
    }
};

export default caregiverAPI;
