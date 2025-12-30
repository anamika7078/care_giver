// import React, { useState, useEffect } from 'react';
// import { FiUser, FiMail, FiPhone, FiEdit2, FiTrash2, FiPlus, FiCheck, FiClock } from 'react-icons/fi';
// import AddCaregiverForm from './AddCaregiverForm';
// import caregiverAPI from '../../services/caregiverAPI';

// // Status badge component
// const StatusBadge = ({ status }) => {
//     const statusStyles = {
//         Active: 'bg-green-100 text-green-800',
//         'On Leave': 'bg-yellow-100 text-yellow-800',
//         Inactive: 'bg-gray-100 text-gray-800',
//     };

//     return (
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
//             {status}
//         </span>
//     );
// };

// const CaregiversList = () => {
//     const [caregivers, setCaregivers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [editingCaregiver, setEditingCaregiver] = useState(null);

//     // Fetch caregivers on component mount
//     useEffect(() => {
//         fetchCaregivers();
//     }, []);

//     const fetchCaregivers = async () => {
//         try {
//             setLoading(true);
//             const response = await caregiverAPI.getCaregivers();
//             setCaregivers(response.data || []);
//             setError(null);
//         } catch (err) {
//             console.error('Error fetching caregivers:', err);
//             setError('Failed to load caregivers. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };
// const handleSaveCaregiver = async (caregiverData, caregiverId) => {
//     try {
//         if (caregiverId) {
//             // Update existing caregiver
//             await caregiverAPI.updateCaregiver(caregiverId, caregiverData);
//             alert('Caregiver updated successfully!');
//         } else {
//             // Add new caregiver
//             await handleAddCaregiver(caregiverData);
//             return; // handleAddCaregiver already shows a success message
//         }

//         // Close the form and refresh the caregivers list
//         setShowAddForm(false);
//         setEditingCaregiver(null);
//         fetchCaregivers();
//     } catch (error) {
//         console.error('Error saving caregiver:', error);
//         let errorMessage = 'Failed to save caregiver';

//         if (error.response) {
//             if (error.response.data && error.response.data.message) {
//                 errorMessage = error.response.data.message;
//             } else if (error.response.data && error.response.data.error) {
//                 errorMessage = error.response.data.error;
//             } else if (error.response.status === 400) {
//                 errorMessage = 'Validation error. Please check the form fields.';
//             }
//         }

//         alert(`Error: ${errorMessage}`);
//     }
// };
//     const handleAddCaregiver = async (newCaregiver) => {
//         try {
//             // Prepare the caregiver data with required fields
//             const caregiverData = {
//                 ...newCaregiver,
//                 role: 'caregiver',
//                 // Generate a random password or use a default one
//                 password: 'Caregiver@123',
//                 confirmPassword: 'Caregiver@123',
//                 // Ensure all required fields are included
//                 status: 'Active',
//                 // Convert skills array to string if it's an array
//                 ...(Array.isArray(newCaregiver.skills) && {
//                     skills: newCaregiver.skills
//                 })
//             };

//             console.log('Sending caregiver data:', caregiverData);

//             // Call the API
//             const response = await caregiverAPI.addCaregiver(caregiverData);
//             console.log('API Response:', response);

//             // Close the form and refresh the caregivers list
//             setShowAddForm(false);
//             setEditingCaregiver(null);
//             fetchCaregivers(); // Refresh the list to include the new caregiver

//             // Show success message
//             alert('Caregiver added successfully!');
//         } catch (error) {
//             console.error('Error adding caregiver:', error);
//             let errorMessage = 'Failed to add caregiver';

//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.error('Response data:', error.response.data);
//                 console.error('Response status:', error.response.status);

//                 // Try to extract a meaningful error message
//                 if (error.response.data && error.response.data.message) {
//                     errorMessage = error.response.data.message;
//                 } else if (error.response.data && error.response.data.error) {
//                     errorMessage = error.response.data.error;
//                 } else if (error.response.status === 400) {
//                     errorMessage = 'Validation error. Please check the form fields.';
//                 } else if (error.response.status === 409) {
//                     errorMessage = 'A caregiver with this email already exists.';
//                 }
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error('No response received:', error.request);
//                 errorMessage = 'No response from server. Please check your connection.';
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.error('Error message:', error.message);
//                 errorMessage = error.message;
//             }

//             alert(`Error: ${errorMessage}`);
//         }
//     };

//     const handleDeleteCaregiver = async (id) => {
//         if (window.confirm('Are you sure you want to delete this caregiver?')) {
//             try {
//                 await caregiverAPI.deleteCaregiver(id);
//                 alert('Caregiver deleted successfully!');
//                 fetchCaregivers(); // Refresh the list
//             } catch (error) {
//                 console.error('Error deleting caregiver:', error);
//                 alert('Failed to delete caregiver. Please try again.');
//             }
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                 <strong className="font-bold">Error: </strong>
//                 <span className="block sm:inline">{error}</span>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800">Caregivers</h1>
//                     <p className="text-sm text-gray-500">Manage your team of caregivers</p>
//                 </div>
//                 <button
//                     onClick={() => {
//                         setEditingCaregiver(null);
//                         setShowAddForm(true);
//                     }}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
//                 >
//                     <FiPlus className="mr-2" /> Add Caregiver
//                 </button>
//             </div>

//             {caregivers.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow p-8 text-center">
//                     <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
//                         <FiUser className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-1">No caregivers</h3>
//                     <p className="text-gray-500 mb-4">Get started by adding a new caregiver.</p>
//                     <button
//                         onClick={() => setShowAddForm(true)}
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         <FiPlus className="-ml-1 mr-2 h-5 w-5" />
//                         New Caregiver
//                     </button>
//                 </div>
//             ) : (
//                 <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Name
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Email
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Phone
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Status
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {caregivers.map((caregiver) => (
//                                     <tr key={caregiver.id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center">
//                                                 <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                                                     <FiUser className="h-5 w-5" />
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <div className="text-sm font-medium text-gray-900">
//                                                         {caregiver.user?.name || `${caregiver.firstName} ${caregiver.lastName}`}
//                                                     </div>
//                                                     <div className="text-sm text-gray-500">
//                                                         {caregiver.specialization || 'Caregiver'}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-900">{caregiver.user?.email || 'N/A'}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="text-sm text-gray-900">{caregiver.phone || 'N/A'}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <StatusBadge status={caregiver.status || 'Active'} />
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                             <button
//                                                 onClick={() => {
//                                                     setEditingCaregiver(caregiver);
//                                                     setShowAddForm(true);
//                                                 }}
//                                                 className="text-blue-600 hover:text-blue-900 mr-4"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeleteCaregiver(caregiver.id)}
//                                                 className="text-red-600 hover:text-red-900"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {/* Add/Edit Caregiver Modal */}
//             {showAddForm && (
//                 <AddCaregiverForm
//                     onClose={() => {
//                         setShowAddForm(false);
//                         setEditingCaregiver(null);
//                     }}
//                     onSave={handleAddCaregiver}
//                     caregiver={editingCaregiver}
//                 />
//             )}
//         </div>
//     );
// };

// export default CaregiversList;
import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit2, FiTrash2, FiPlus, FiCheck, FiClock } from 'react-icons/fi';
import AddCaregiverForm from './AddCaregiverForm';
import caregiverAPI from '../../services/caregiverAPI';

// Status badge component
const StatusBadge = ({ status }) => {
    const statusStyles = {
        Active: 'bg-green-100 text-green-800',
        'On Leave': 'bg-yellow-100 text-yellow-800',
        Inactive: 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const CaregiversList = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCaregiver, setEditingCaregiver] = useState(null);

    // Fetch caregivers on component mount
    useEffect(() => {
        fetchCaregivers();
    }, []);

    const fetchCaregivers = async () => {
        try {
            setLoading(true);
            const response = await caregiverAPI.getCaregivers();
            setCaregivers(response.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching caregivers:', err);
            setError('Failed to load caregivers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCaregiver = async (caregiverData, caregiverId) => {
        try {
            if (caregiverId) {
                // Update existing caregiver
                await caregiverAPI.updateCaregiver(caregiverId, caregiverData);
                alert('Caregiver updated successfully!');
            } else {
                // Add new caregiver
                await handleAddCaregiver(caregiverData);
                return; // handleAddCaregiver already shows a success message
            }

            // Close the form and refresh the caregivers list
            setShowAddForm(false);
            setEditingCaregiver(null);
            fetchCaregivers();
        } catch (error) {
            console.error('Error saving caregiver:', error);
            let errorMessage = 'Failed to save caregiver';

            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (error.response.status === 400) {
                    errorMessage = 'Validation error. Please check the form fields.';
                }
            }

            alert(`Error: ${errorMessage}`);
        }
    };

    const handleAddCaregiver = async (newCaregiver) => {
        try {
            // Prepare the caregiver data with required fields
            const caregiverData = {
                ...newCaregiver,
                role: 'caregiver',
                password: 'Caregiver@123',
                confirmPassword: 'Caregiver@123',
                status: 'Active',
                ...(Array.isArray(newCaregiver.skills) && {
                    skills: newCaregiver.skills
                })
            };

            console.log('Sending caregiver data:', caregiverData);

            // Call the API
            const response = await caregiverAPI.addCaregiver(caregiverData);
            console.log('API Response:', response);

            // Close the form and refresh the caregivers list
            setShowAddForm(false);
            setEditingCaregiver(null);
            fetchCaregivers();

            // Show success message
            alert('Caregiver added successfully!');
        } catch (error) {
            console.error('Error adding caregiver:', error);
            let errorMessage = 'Failed to add caregiver';

            if (error.response) {
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (error.response.status === 400) {
                    errorMessage = 'Validation error. Please check the form fields.';
                } else if (error.response.status === 409) {
                    errorMessage = 'A caregiver with this email already exists.';
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
                errorMessage = 'No response from server. Please check your connection.';
            } else {
                console.error('Error message:', error.message);
                errorMessage = error.message;
            }

            alert(`Error: ${errorMessage}`);
        }
    };

    const handleDeleteCaregiver = async (id) => {
        if (window.confirm('Are you sure you want to delete this caregiver?')) {
            try {
                await caregiverAPI.deleteCaregiver(id);
                alert('Caregiver deleted successfully!');
                fetchCaregivers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting caregiver:', error);
                alert('Failed to delete caregiver. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Caregivers</h1>
                    <p className="text-sm text-gray-500">Manage your team of caregivers</p>
                </div>
                <button
                    onClick={() => {
                        setEditingCaregiver(null);
                        setShowAddForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    <FiPlus className="mr-2" /> Add Caregiver
                </button>
            </div>

            {caregivers.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <FiUser className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No caregivers</h3>
                    <p className="text-gray-500 mb-4">Get started by adding a new caregiver.</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                        New Caregiver
                    </button>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {caregivers.map((caregiver) => (
                                    <tr key={caregiver.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <FiUser className="h-5 w-5" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {caregiver.user?.name || `${caregiver.firstName} ${caregiver.lastName}`}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {caregiver.specialization || 'Caregiver'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{caregiver.user?.email || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{caregiver.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={caregiver.status || 'Active'} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => {
                                                    setEditingCaregiver(caregiver);
                                                    setShowAddForm(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCaregiver(caregiver.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Caregiver Modal */}
            {showAddForm && (
                <AddCaregiverForm
                    onClose={() => {
                        setShowAddForm(false);
                        setEditingCaregiver(null);
                    }}
                    onSave={handleSaveCaregiver}
                    caregiver={editingCaregiver}
                />
            )}
        </div>
    );
};

export default CaregiversList;