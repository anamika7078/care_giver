import React, { useState, useEffect } from 'react';
import { FiX, FiUpload, FiUser, FiMail, FiPhone, FiMapPin, FiPhoneCall, FiCalendar } from 'react-icons/fi';

const AddCaregiverForm = ({ onClose, onSave, caregiver, isEditing = false }) => {
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        dateOfBirth: '',
        emergencyContact: '',
        emergencyPhone: '',
        specialization: '',
        skills: [],
        experience: '',
        bio: '',
        profileImage: null,
        status: 'Active',
        availability: 1
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);

    // Pre-fill form when in edit mode
    useEffect(() => {
        if (caregiver) {
            console.log('Caregiver data in form:', caregiver);

            // Handle both nested user object and flat structure
            const userData = caregiver.user || {};
            const caregiverData = caregiver.user ? { ...caregiver } : caregiver;

            // If name exists but not firstName/lastName, split it
            let firstName = userData.firstName || '';
            let lastName = userData.lastName || '';

            if ((!firstName && !lastName) && userData.name) {
                const nameParts = userData.name.split(' ');
                firstName = nameParts[0] || '';
                lastName = nameParts.slice(1).join(' ') || '';
            }

            const formDataUpdate = {
                id: caregiver.id || '',
                firstName: firstName || caregiver.firstName || '',
                lastName: lastName || caregiver.lastName || '',
                email: userData.email || caregiver.email || '',
                phone: userData.phone || caregiver.phone || '',
                address: caregiverData.address || caregiver.address || '',
                city: caregiverData.city || caregiver.city || '',
                state: caregiverData.state || caregiver.state || '',
                zipCode: caregiverData.zipCode || caregiver.zipCode || '',
                dateOfBirth: caregiverData.dateOfBirth || caregiver.dateOfBirth || '',
                emergencyContact: caregiverData.emergencyContact || caregiver.emergencyContact || '',
                emergencyPhone: caregiverData.emergencyPhone || caregiver.emergencyPhone || '',
                specialization: caregiverData.specialization || caregiver.specialization || 'General',
                skills: [],
                experience: caregiverData.experience || caregiver.experience || '0',
                bio: caregiverData.bio || caregiver.bio || '',
                status: caregiverData.status || caregiver.status || 'Active',
                availability: caregiverData.availability || caregiver.availability || 1
            };

            // Handle skills array or JSON string
            if (caregiverData.skills) {
                if (Array.isArray(caregiverData.skills)) {
                    formDataUpdate.skills = [...caregiverData.skills];
                } else if (typeof caregiverData.skills === 'string') {
                    try {
                        formDataUpdate.skills = JSON.parse(caregiverData.skills);
                    } catch (e) {
                        console.error('Error parsing skills:', e);
                        formDataUpdate.skills = [];
                    }
                }
            } else if (caregiver.skills) {
                if (Array.isArray(caregiver.skills)) {
                    formDataUpdate.skills = [...caregiver.skills];
                } else if (typeof caregiver.skills === 'string') {
                    try {
                        formDataUpdate.skills = JSON.parse(caregiver.skills);
                    } catch (e) {
                        console.error('Error parsing skills:', e);
                        formDataUpdate.skills = [];
                    }
                }
            }

            console.log('Form data after processing:', formDataUpdate);
            setFormData(prev => ({
                ...prev,
                ...formDataUpdate
            }));

            // Set profile image if available
            if (userData.profileImage) {
                setPreviewImage(userData.profileImage);
            } else if (caregiver.profileImage) {
                setPreviewImage(caregiver.profileImage);
            } else if (caregiver.user?.profileImage) {
                setPreviewImage(caregiver.user.profileImage);
            }
        }
    }, [caregiver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < 2) {
            setCurrentStep(2);
        } else {
            const dataToSave = {
                ...formData,
                // Ensure we include the ID when updating
                ...(isEditing && caregiver?.id && { id: caregiver.id }),
                // Format skills as an array if it's not already
                skills: Array.isArray(formData.skills) ? formData.skills : []
            };
            console.log('Saving caregiver data:', dataToSave);
            onSave(dataToSave);
        }
    };
    const nextStep = () => setCurrentStep(2);
    const prevStep = () => setCurrentStep(1);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto my-8 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {caregiver ? 'Edit Caregiver' : 'Add New Caregiver'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-4 pt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${currentStep * 50}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>Step {currentStep} of 2</span>
                        <span>{currentStep === 1 ? 'Basic Info' : 'Professional Info'}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {currentStep === 1 ? (
                        <div className="space-y-4">
                            {/* Profile Image Upload */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-24 h-24 rounded-full bg-gray-100 mb-2 overflow-hidden">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FiUser size={32} />
                                        </div>
                                    )}
                                </div>
                                <label className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    <FiUpload className="mr-1" /> Upload Photo
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiCalendar className="text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMapPin className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Street address"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="State/Province"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="ZIP/Postal Code"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Elderly Care', 'First Aid', 'CPR', 'Medication Management', 'Dementia Care'].map(skill => (
                                        <label key={skill} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                checked={formData.skills.includes(skill)}
                                                onChange={(e) => {
                                                    const newSkills = e.target.checked
                                                        ? [...formData.skills, skill]
                                                        : formData.skills.filter(s => s !== skill);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        skills: newSkills
                                                    }));
                                                }}
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{skill}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    min="0"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    rows="3"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Tell us about the caregiver's experience and qualifications..."
                                ></textarea>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiPhoneCall className="text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="emergencyPhone"
                                                value={formData.emergencyPhone}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        {currentStep === 1 ? (
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Back
                            </button>
                        )}

                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {currentStep === 1 ? 'Next' : 'Save Caregiver'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCaregiverForm;
