import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiFileText, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white shadow-xl">
        <div className="p-6 border-b border-gray-800 mt-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Parents First
          </h2>
          <p className="text-sm text-gray-300 mt-1">Admin Dashboard</p>
        </div>

        <nav className="p-4 space-y-1 mt-4">
          {[
            { to: '/admin', icon: FiHome, label: 'Dashboard' },
            { to: '/admin/caregivers', icon: FiUsers, label: 'Caregivers' },
            { to: '/admin/invoices', icon: FiFileText, label: 'Invoices' },
            { to: '/admin/reports', icon: FiBarChart2, label: 'Reports' }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 ${isActive(item.to)
                ? 'bg-gray-800 text-white shadow-md font-semibold'
                : 'text-gray-300 hover:bg-gray-800 hover:pl-6 hover:shadow-sm hover:border hover:border-gray-700 hover:text-white'
                }`}
            >
              <item.icon className="mr-3.5 text-lg" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-800">
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full text-left flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <FiLogOut className="mr-3.5 text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;