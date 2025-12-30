import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiHeart, FiUser, FiPlusCircle } from 'react-icons/fi';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusColors = {
    'Good': 'bg-green-100 text-green-800',
    'Stable': 'bg-blue-100 text-blue-800',
    'Needs Attention': 'bg-yellow-100 text-yellow-800',
    'Critical': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {
  // Mock data
  const familyName = "Smith Family";
  const elders = [
    {
      id: 1,
      name: 'John Smith',
      age: 75,
      lastVisit: '2023-12-15',
      image: 'https://images.unsplash.com/photo-1573496358961-3d9db6fbedf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      healthStatus: 'Good',
      nextAppointment: '2023-12-20'
    },
    {
      id: 2,
      name: 'Mary Smith',
      age: 72,
      lastVisit: '2023-12-10',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      healthStatus: 'Stable',
      nextAppointment: '2023-12-18'
    }
  ];

  const upcomingAppointment = {
    date: '2023-12-20',
    time: '10:00 AM',
    caregiver: 'Dr. Sarah Johnson',
    service: 'Routine Checkup',
    location: 'Main Hospital, Room 305',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
  };

  const healthTips = [
    'Drink at least 8 glasses of water daily',
    'Take your medications on time',
    '30 minutes of light exercise recommended'
  ];

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {familyName}!</h1>
              <p className="text-gray-600 mt-1">Here's an overview of your family's care</p>
            </div>
            <Link
              to="/family/book-service"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlusCircle className="mr-2" /> Book Service
            </Link>
          </div>
        </motion.div>

        {/* Elderly Members */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Family Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elders.map((elder) => (
              <div key={elder.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <img
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                    src={elder.image}
                    alt={elder.name}
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{elder.name}</h3>
                      <StatusBadge status={elder.healthStatus} />
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FiUser className="mr-1.5" />
                      <span>{elder.age} years old</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Last Visit</p>
                        <div className="flex items-center mt-1">
                          <FiCalendar className="mr-1.5 text-gray-400" />
                          <span className="font-medium text-gray-700">{elder.lastVisit}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Visit</p>
                        <div className="flex items-center mt-1">
                          <FiClock className="mr-1.5 text-gray-400" />
                          <span className="font-medium text-gray-700">{elder.nextAppointment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/messages"
                    className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      💬
                    </div>
                    <span className="text-sm font-medium text-gray-700">Messages</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;