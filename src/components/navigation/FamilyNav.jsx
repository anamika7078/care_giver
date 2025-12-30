import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiCalendar,
  FiAlertTriangle,
  FiLogOut
} from 'react-icons/fi';

const FamilyNav = () => {
  const location = useLocation();

  const navItems = [
    { to: '/portal/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/portal/elder-profiles', icon: FiUser, label: 'Elder Profiles' },
    { to: '/portal/book-service', icon: FiCalendar, label: 'Book Service' },
    { to: '/portal/emergency', icon: FiAlertTriangle, label: 'Emergency' },
    { to: '/logout', icon: FiLogOut, label: 'Logout' },
  ];

  return (
    <nav className="space-y-2 p-4">
      <div className="px-4 py-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Family Care</h2>
      </div>

      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive
              ? 'bg-blue-100 text-blue-700 shadow-sm'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="whitespace-nowrap">{item.label}</span>
        </NavLink>
      ))}

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center px-4 py-2 text-sm text-gray-600">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
            {localStorage.getItem('userName')?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{localStorage.getItem('userName') || 'User'}</p>
            <p className="text-xs text-gray-500">Family Member</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FamilyNav;
