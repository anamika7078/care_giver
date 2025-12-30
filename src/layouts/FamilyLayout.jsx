// src/layouts/FamilyLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiClock, FiUser, FiUsers, FiCalendar, FiFileText, FiCreditCard, FiAlertTriangle, FiLogOut, FiBell, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import EmergencyButton from '../components/EmergencyButton';
import Navbar from '../components/Navbar';

const FamilyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showTopNav, setShowTopNav] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  // Hide top navbar when a sidebar tab is clicked
  const handleSidebarClick = () => {
    setShowTopNav(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-cover bg-center" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1505751172876-faee399cffc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {showTopNav && <Navbar />}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white shadow-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 border-b border-white/20"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Family Care</h2>
            <p className="text-sm text-gray-300 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'User'}</p>
          </motion.div>

          <nav className="p-4 space-y-1 mt-4">
            {[
              { to: '/family/dashboard', icon: FiHome, label: 'Dashboard' },
              { to: '/family/elders', icon: FiUsers, label: 'Elder Profiles' },
              { to: '/family/book-service', icon: FiCalendar, label: 'Book Service' },
              // { to: '/family/bookings', icon: FiClock, label: 'Bookings' },
              // { to: '/family/documents', icon: FiFileText, label: 'Documents' },
              // { to: '/family/payments', icon: FiCreditCard, label: 'Payments' },
              { to: '/family/emergency', icon: FiAlertTriangle, label: 'Emergency' },
            ].map((item) => (
              // <Link
              //   key={item.to}
              //   to={item.to}
              //   onClick={handleSidebarClick}
              //   className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${isActive(item.to)
              //     ? 'bg-blue-100/80 text-blue-700 font-medium shadow-inner'
              //     : 'text-gray-700 hover:bg-white/80 hover:pl-6 hover:text-blue-600 hover:shadow-md hover:bg-white/50'
              //     }`}
              // >
              <Link
                key={item.to}
                to={item.to}
                onClick={handleSidebarClick}
                className={`group flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 ${isActive(item.to)
                  ? 'bg-gray-800 text-white shadow-md font-semibold'
                  : 'text-gray-300 hover:bg-gray-800 hover:pl-6 hover:shadow-sm hover:border hover:border-gray-700 hover:text-white'
                  }`}
              >
                <item.icon className="mr-3.5 text-lg" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left flex items-center px-4 py-3 text-red-600 hover:bg-red-50/80 hover:text-red-700 rounded-lg transition-all duration-300 hover:pl-6 hover:shadow-md mt-2"
              >
                <FiLogOut className="mr-3.5 text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white/90 backdrop-blur-sm rounded-l-2xl shadow-2xl m-2 overflow-hidden">
          {/* Top Navigation */}
         
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md border-b border-white/20 px-6 py-4 flex justify-between items-center shadow-sm"
          >
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {location.pathname.split('/').pop()
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiBell className="h-5 w-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white/50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Outlet />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyLayout;