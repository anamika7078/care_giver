import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiActivity, FiPlus, FiClock, FiUser, FiArrowRight, FiHome, FiHeart, FiBell } from 'react-icons/fi';
import EmergencyButton from '../../components/EmergencyButton';
// QuickStat component for displaying statistics with modern design
const QuickStat = ({ icon, title, value, link, color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-indigo-600',
    orange: 'from-amber-500 to-orange-600'
  };

  const iconBgMap = {
    blue: 'bg-blue-500/10',
    green: 'bg-emerald-500/10',
    purple: 'bg-purple-500/10',
    orange: 'bg-amber-500/10'
  };

  const iconColorMap = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    purple: 'text-purple-600',
    orange: 'text-amber-600'
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className={`text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${colorMap[color]}`}>
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-xl ${iconBgMap[color]}`}>
            {React.cloneElement(icon, {
              className: `h-6 w-6 ${iconColorMap[color]}`
            })}
          </div>
        </div>
        <Link
          to={link}
          className={`mt-4 inline-flex items-center text-sm font-medium text-${color}-600 hover:text-${color}-700 transition-colors`}
        >
          View all
          <FiArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

// FamilyMember component for displaying family member cards with modern design
const FamilyMember = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      key={member.id}
      className="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/portal/elders/${member.id}`} className="block">
        <div className="p-5">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <FiUser className="h-6 w-6 text-blue-600" />
              </div>
              {member.healthStatus === 'needs_attention' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 truncate">
                  {member.name}
                </h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                  {member.relationship}
                </span>
              </div>
              <div className="mt-1.5 flex items-center text-sm text-gray-500">
                <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <span>Last checkup: {member.lastCheckup}</span>
              </div>
              {member.nextAppointment && (
                <div className="mt-1.5 flex items-center text-sm text-gray-600">
                  <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-blue-400" />
                  <span>Next: {member.nextAppointment}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.li>
  );
};

// Appointment component for displaying appointment cards with modern design
const Appointment = ({ appointment }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine appointment status and styling
  const isUpcoming = new Date(appointment.date) > new Date();
  const isToday = new Date(appointment.date).toDateString() === new Date().toDateString();

  const statusColor = isToday
    ? 'bg-blue-100 text-blue-800 border-blue-200'
    : isUpcoming
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';

  const statusText = isToday
    ? 'Today'
    : isUpcoming
      ? 'Upcoming'
      : 'Completed';

  return (
    <motion.li
      key={appointment.id}
      className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-3 last:mb-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-gray-900">
                {appointment.title}
              </h4>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor} border ml-2`}>
                {statusText}
              </span>
            </div>

            <div className="mt-2 flex items-center text-sm text-gray-600">
              <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <span>Dr. {appointment.doctor}</span>
            </div>

            <div className="mt-1.5 flex items-center text-sm text-gray-600">
              <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              <span className="mx-1">•</span>
              <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
              <span>{appointment.time}</span>
            </div>

            {appointment.location && (
              <div className="mt-1.5 flex items-center text-sm text-gray-500">
                <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{appointment.location}</span>
              </div>
            )}
          </div>

          <div className="ml-4 flex-shrink-0 flex space-x-2">
            <Link
              to={`/portal/appointments/${appointment.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View
            </Link>
            {isUpcoming && (
              <Link
                to={`/portal/appointments/${appointment.id}/reschedule`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Reschedule
              </Link>
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.li>
  );
};

// Main Dashboard component
const Dashboard = () => {
  // Sample data - replace with actual data from your state/API
  const familyMembers = [
    { id: 1, name: 'John Doe', relationship: 'Father', lastCheckup: '2023-06-15' },
    { id: 2, name: 'Jane Smith', relationship: 'Mother', lastCheckup: '2023-06-10' },
  ];

  const upcomingAppointments = [
    { id: 1, title: 'Annual Checkup', date: '2023-07-15', time: '10:00 AM', doctor: 'Dr. Smith' },
    { id: 2, title: 'Dental Cleaning', date: '2023-07-20', time: '2:30 PM', doctor: 'Dr. Johnson' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <EmergencyButton />
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-xl mb-10">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-10"
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Family care banner"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Family Care Portal
          </h1>
          <p className="mt-4 text-lg text-blue-50 max-w-3xl mx-auto leading-relaxed">
            <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Managing your family's healthcare, one appointment at a time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white rounded-2xl shadow-lg p-6 space-y-4 md:space-y-0 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Welcome back! Here's what's happening with your family's care.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto mt-4 md:mt-0">
            <Link
              to="/family/add-family-member"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Family Member
            </Link>
            <Link
              to="/family/book-service"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Upcoming Appointments Section */}
          <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="absolute inset-0 z-0">
              {/* <img 
                src="https://images.unsplash.com/photo-1505751172876-fa186e16a331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Medical appointment" 
                className="w-full h-full object-cover opacity-5"
              /> */}
            </div>
            <div className="relative z-10">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
              </div>
              <div className="bg-white bg-opacity-70">
                <ul className="divide-y divide-gray-200">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <Appointment key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <li className="px-6 py-4 text-center text-gray-500">
                      No upcoming appointments scheduled.
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-gray-50 bg-opacity-80 px-6 py-3 text-right">
                <Link
                  to="/portal/appointments"
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  View all appointments →
                </Link>
              </div>
            </div>
          </div>

          {/* Family Members Section */}
          <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
            <div className="absolute inset-0 z-0">
              {/* <img 
                src="https://images.unsplash.com/photo-1573497491208-465b01514f34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Family" 
                className="w-full h-full object-cover opacity-5"
              /> */}
            </div>
            <div className="relative z-10">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Family Members</h3>
              </div>
              <div className="bg-white bg-opacity-70">
                <ul className="divide-y divide-gray-200">
                  {familyMembers.length > 0 ? (
                    familyMembers.map((member) => (
                      <FamilyMember key={member.id} member={member} />
                    ))
                  ) : (
                    <li className="px-6 py-4 text-center text-gray-500">
                      No family members added yet.
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-gray-50 bg-opacity-80 px-6 py-3 text-right">
                <Link
                  to="/portal/elders"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all family members →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="bg-white">
              <div className="px-6 py-4 text-center text-gray-500">
                <p>No recent activity to display.</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-right">
              <Link
                to="/portal/activity"
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;