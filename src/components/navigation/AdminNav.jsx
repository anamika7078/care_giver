import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiCalendar,
  FiUserPlus,
  FiCheckCircle,
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';

const AdminNav = () => {
  const navItems = [
    { to: '/admin/bookings', icon: FiCalendar, label: 'View Bookings' },
    { to: '/admin/assign-caregiver', icon: FiUserPlus, label: 'Assign Caregiver' },
    { to: '/admin/update-status', icon: FiCheckCircle, label: 'Update Status' },
    { to: '/admin/invoices', icon: FiDollarSign, label: 'Generate Invoice' },
    { to: '/admin/reports', icon: FiBarChart2, label: 'Reports & Analytics' },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default AdminNav;
