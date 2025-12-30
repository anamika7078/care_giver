import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUser, FiAlertCircle, FiCheckCircle, FiUsers } from 'react-icons/fi';
import { addFamilyMember } from '../../services/api/familyMemberService';
import { useAuth } from '../../context/AuthContext';
import { getActiveCaregivers } from '../../services/api/caregiverServices';

const AddFamilyMember = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { elderId } = useParams();


  // Redirect to elders list if elderId is not provided
  useEffect(() => {
    if (!elderId) {
      setAlert({
        show: true,
        type: 'error',
        message: 'No elder specified. Please select an elder first.'
      });

      // Redirect to elders list after showing the error
      const timer = setTimeout(() => {
        navigate('/portal/elders');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [elderId, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationship: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    caregiverId: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    medicalHistory: ''
  });

  const [caregivers, setCaregivers] = useState([]);
  const [loadingCaregivers, setLoadingCaregivers] = useState(true);
  const [caregiverError, setCaregiverError] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const relationships = [
    'spouse', 'child', 'parent', 'sibling', 'grandchild', 'friend', 'other'
  ];

  // Display names for the relationships in the UI
  const relationshipDisplayNames = {
    'spouse': 'Spouse',
    'child': 'Child',
    'parent': 'Parent',
    'sibling': 'Sibling',
    'grandchild': 'Grandchild',
    'friend': 'Friend',
    'other': 'Other'
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    // Fetch active caregivers when component mounts
    const fetchCaregivers = async () => {
      try {
        setLoadingCaregivers(true);
        const response = await getActiveCaregivers();
        setCaregivers(response.data || []);
        setCaregiverError('');
      } catch (error) {
        console.error('Error fetching caregivers:', error);
        setCaregiverError('Failed to load caregivers. Please try again later.');
      } finally {
        setLoadingCaregivers(false);
      }
    };

    fetchCaregivers();

    // Any existing useEffect logic
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested emergency contact fields
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.relationship) newErrors.relationship = 'Relationship is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error('Please log in to add a family member');
      }

      const userId = user.id;

      // This check is now handled by the useEffect hook above
      // Keeping it as an extra safety measure
      if (!elderId) {
        throw new Error('No elder specified. Please select an elder first.');
      }

      // Prepare the data in the exact format expected by the API
      const memberData = {
        userId,
        elderId,
        relationship: formData.relationship,
        caregiverId: formData.caregiverId || null, // Include the selected caregiver ID
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        permissions: {
          isPrimary: false,
          canViewMedical: true,
          canEditProfile: true,
          canBookServices: true
        },
        details: {
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup || null,
          phoneNumber: formData.phoneNumber.trim(),
          email: formData.email.trim() || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          emergencyContact: {
            name: formData.emergencyContact.name,
            relationship: formData.emergencyContact.relationship,
            phone: formData.emergencyContact.phone
          },
          medicalHistory: formData.medicalHistory
        }
      };

      // Call the API to add family member
      await addFamilyMember(memberData);

      // Show success alert
      setAlert({
        show: true,
        type: 'success',
        message: 'Family member added successfully! Redirecting...'
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/portal/elders');
      }, 2000);

    } catch (error) {
      console.error('Error adding family member:', error);
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'Failed to add family member. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Alert Notification */}
        {alert.show && (
          <div className={`mb-6 p-4 rounded-md ${alert.type === 'success'
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
            }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {alert.type === 'success' ? (
                  <FiCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                ) : (
                  <FiAlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${alert.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                  {alert.message}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">
              Add New Family Member
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Please fill in the details below to add a new family member to your care circle.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            {/* Personal Information */}
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                    Relationship *
                  </label>
                  <select
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select relationship</option>
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {relationshipDisplayNames[rel]}
                      </option>
                    ))}
                  </select>
                  {errors.relationship && (
                    <p className="mt-2 text-sm text-red-600">{errors.relationship}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="caregiverId" className="block text-sm font-medium text-gray-700">
                    Assign Caregiver
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUsers className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="caregiverId"
                      name="caregiverId"
                      value={formData.caregiverId}
                      onChange={handleInputChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      disabled={loadingCaregivers}
                    >
                      <option value="">Select a caregiver (optional)</option>
                      {loadingCaregivers ? (
                        <option>Loading caregivers...</option>
                      ) : caregivers.length > 0 ? (
                        caregivers.map((caregiver) => (
                          <option key={caregiver.id} value={caregiver.id}>
                            {caregiver.name} - {caregiver.specialization || 'No specialization'}
                          </option>
                        ))
                      ) : (
                        <option disabled>No caregivers available</option>
                      )}
                    </select>
                  </div>
                  {caregiverError && (
                    <p className="mt-2 text-sm text-red-600">{caregiverError}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Gender *</label>
                  <div className="mt-1 space-x-4 flex">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-700">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Female</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Other</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((bloodGroup, index) => (
                      <option key={index} value={bloodGroup}>{bloodGroup}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    id="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.emergencyContact && (
                    <p className="mt-2 text-sm text-red-600">{errors.emergencyContact}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    id="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.emergencyContact && (
                    <p className="mt-2 text-sm text-red-600">{errors.emergencyContact}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    id="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  {errors.emergencyContact && (
                    <p className="mt-2 text-sm text-red-600">{errors.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4">Medical Information</h4>
              <div>
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                  Medical History (Allergies, Previous Illnesses, etc.)
                </label>
                <div className="mt-1">
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    rows={4}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2.5 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isSubmitting
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiUser className="mr-2 h-4 w-4" />
                    Add Family Member
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMember;
