import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiCalendar, FiPhone, FiMapPin, FiPlus } from 'react-icons/fi';

// Inline styles for the background
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '2rem 0',
  },
  contentContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  addCardHover: {
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
  },
};

const EldersList = () => {
  // Sample data - replace with your actual data
  const elders = [
    {
      id: 1,
      name: 'John Doe',
      age: 75,
      relation: 'Father',
      lastVisit: '2023-12-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 72,
      relation: 'Mother',
      lastVisit: '2023-12-10',
      status: 'active'
    }
  ];

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer} className="px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/family/dashboard" className="mr-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <FiArrowLeft className="h-7 w-7" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Elderly Family Members</h1>
            <p className="text-gray-600">Manage and connect with your loved ones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elders.map((elder) => (
            <div
              key={elder.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 border border-gray-100"
              style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <FiUser className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-800">{elder.name}</h2>
                    <p className="text-gray-600">{elder.relation}</p>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-gray-600">
                    <FiCalendar className="mr-2 text-blue-500" />
                    <span>Last Visit: {elder.lastVisit}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiUser className="mr-2 text-blue-500" />
                    <span>Age: {elder.age} years</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${elder.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}>
                      {elder.status.charAt(0).toUpperCase() + elder.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Link
                    to={`/family/elders/${elder.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/family/elders/add"
            className="border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer bg-white/80 hover:bg-indigo-50/80 backdrop-blur-sm hover:border-indigo-400 hover:shadow-lg"
            style={{
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-3 shadow-md">
              <FiPlus className="h-6 w-6" />
            </div>
            <span className="text-indigo-600 font-medium text-lg mt-2">Add New Elder</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EldersList;