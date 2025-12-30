// src/pages/admin/Caregivers.jsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import AddCaregiverForm from '../../components/caregiver/AddCaregiverForm';

const Caregivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCaregiver, setCurrentCaregiver] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredCaregivers = caregivers.filter(caregiver =>
    (caregiver.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (caregiver.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (caregiver.phone?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      console.log('Fetching caregivers with token:', token ? 'Token present' : 'No token');

      const response = await fetch('http://localhost:5000/api/caregivers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });

      // First, check if the response is ok
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: response.statusText };
        }

        console.error('Server response error:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: errorData
        });

        if (response.status === 401) {
          // Token might be expired or invalid
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }

        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      // If response is ok, parse the JSON
      const responseData = await response.json();
      console.log('Caregivers data received:', responseData);

      setCaregivers(responseData.data || responseData || []);
      setError(null);
    } catch (err) {
      console.error('Error in fetchCaregivers:', {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });

      // More user-friendly error message
      let errorMessage = 'Failed to load caregivers. ';
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage += 'Unable to connect to the server. Please check your internet connection or try again later.';
      } else {
        errorMessage += err.message || 'Please try again later.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (caregiver) => {
    // Format the caregiver data to match the form's expected structure
    const formattedCaregiver = {
      ...caregiver,
      // If the data comes from the API with a nested user object, flatten it
      ...(caregiver.user && {
        ...caregiver.user,
        // If name is a single field, split it into firstName and lastName
        ...(caregiver.user.name && !caregiver.user.firstName && {
          firstName: caregiver.user.name.split(' ')[0],
          lastName: caregiver.user.name.split(' ').slice(1).join(' ')
        })
      }),
      // Include any other fields that might be needed
      id: caregiver.id || caregiver.user?.id
    };

    setCurrentCaregiver(formattedCaregiver);
    setShowEditModal(true);
  };

 const handleUpdateCaregiver = async (updatedCaregiver) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/caregivers/${updatedCaregiver.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: updatedCaregiver.firstName,
        lastName: updatedCaregiver.lastName,
        email: updatedCaregiver.email,
        phone: updatedCaregiver.phone,
        specialization: updatedCaregiver.specialization,
        experience: updatedCaregiver.experience,
        bio: updatedCaregiver.bio,
        status: updatedCaregiver.status,
        address: updatedCaregiver.address,
        city: updatedCaregiver.city,
        state: updatedCaregiver.state,
        zipCode: updatedCaregiver.zipCode,
        emergencyContact: updatedCaregiver.emergencyContact,
        emergencyPhone: updatedCaregiver.emergencyPhone,
        hourlyRate: updatedCaregiver.hourlyRate,
        languages: updatedCaregiver.languages,
        certifications: updatedCaregiver.certifications
      })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update caregiver');
    }
    // Refresh the caregivers list
    await fetchCaregivers();
    setShowEditModal(false);
    alert('Caregiver updated successfully!');
  } catch (error) {
    console.error('Error updating caregiver:', error);
    alert(`Error: ${error.message}`);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this caregiver?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/caregivers/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete caregiver');
        }

        // Refresh the caregivers list
        fetchCaregivers();
        alert('Caregiver deleted successfully');
      } catch (error) {
        console.error('Error deleting caregiver:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };
  const handleAddCaregiver = async (newCaregiver) => {
    try {
      console.log('Adding caregiver with data:', newCaregiver); // Debug log

      // 1. First check if user with this email already exists
      const checkUserResponse = await fetch(
        `http://localhost:5000/api/users/email/${encodeURIComponent(newCaregiver.email)}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (checkUserResponse.ok) {
        const data = await checkUserResponse.json();
        if (data.exists) {
          throw new Error('A user with this email already exists. Please use a different email.');
        }
      }

      // Format phone number - ensure it's a string and has proper length
      const phone = newCaregiver.phone ? String(newCaregiver.phone).replace(/\D/g, '') : '';
      if (phone.length < 10 || phone.length > 15) {
        throw new Error('Phone number must be between 10 and 15 digits');
      }

      // 2. Register the user first
      const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: newCaregiver.firstName?.trim() || '',
          lastName: newCaregiver.lastName?.trim() || '',
          email: newCaregiver.email?.trim() || '',
          phone: phone,
          password: 'Caregiver@123', // Default password
          role: 'caregiver'
        })
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.message || 'Failed to register user');
      }

      const userData = await registerResponse.json();
      const userId = userData.user.id;

      // 3. Create caregiver profile
      const caregiverResponse = await fetch('http://localhost:5000/api/caregivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: userId,
          specialization: newCaregiver.specialization || 'General',
          experience: newCaregiver.experience || 0,
          bio: newCaregiver.bio || '',
          availability: newCaregiver.availability || 1,
          status: 'active',
          dateOfBirth: newCaregiver.dateOfBirth || null,
          address: newCaregiver.address || '',
          city: newCaregiver.city || '',
          state: newCaregiver.state || '',
          zipCode: newCaregiver.zipCode || '',
          emergencyContact: newCaregiver.emergencyContact || '',
          emergencyPhone: newCaregiver.emergencyPhone || '',
          hourlyRate: newCaregiver.hourlyRate || 0,
          languages: newCaregiver.languages || [],
          certifications: newCaregiver.certifications || []
        })
      });

      if (!caregiverResponse.ok) {
        const error = await caregiverResponse.json();
        throw new Error(error.message || 'Failed to create caregiver profile');
      }

      // 4. Refresh the caregivers list
      await fetchCaregivers();
      setShowAddModal(false);
      alert('Caregiver added successfully!');

    } catch (error) {
      console.error('Error adding caregiver:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 pt-8">
        <h1 className="text-2xl font-bold text-gray-800">Caregivers</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <FiUserPlus className="mr-2" /> Add Caregiver
        </button>
      </div>

      {/* Search and Filter */}
      {/* <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-80">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiFilter className="mr-2" /> Filter
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Caregivers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-600">
            Error: {error}
            <button
              onClick={fetchCaregivers}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCaregivers.length > 0 ? (
                filteredCaregivers.map((caregiver) => (
                  <tr key={caregiver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FiUserPlus className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{caregiver.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caregiver.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caregiver.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${caregiver.status === 'Active' ? 'bg-green-100 text-green-800' :
                        caregiver.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {caregiver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="Edit"
                        onClick={() => handleEdit(caregiver)}
                      >
                        <FiEdit2 className="inline-block" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        onClick={() => handleDelete(caregiver.id)}
                      >
                        <FiTrash2 className="inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No matching caregivers found' : 'No caregivers available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Caregiver Modal */}
      {showAddModal && (
        <AddCaregiverForm
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCaregiver}
        />
      )}

      {/* Edit Caregiver Modal */}
      {showEditModal && currentCaregiver && (
        <AddCaregiverForm
          caregiver={currentCaregiver}
          isEditing={true}
          onClose={() => {
            setShowEditModal(false);
            setCurrentCaregiver(null);
          }}
          onSave={handleUpdateCaregiver}
        />
      )}
    </div>
  );
};

export default Caregivers;