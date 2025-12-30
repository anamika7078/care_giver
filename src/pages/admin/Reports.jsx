// src/pages/admin/Reports.jsx
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiBarChart2, FiUsers, FiDollarSign, FiCalendar, FiDownload, FiFilter, FiRefreshCw, FiPrinter, FiFileText } from 'react-icons/fi';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('this_month');
  const [isLoading, setIsLoading] = useState(false);

  const reportTabs = [
    { id: 'overview', name: 'Overview', icon: FiBarChart2 },
    { id: 'caregiver-performance', name: 'Caregiver Performance', icon: FiUsers },
    { id: 'financial', name: 'Financial', icon: FiDollarSign },
    { id: 'appointments', name: 'Appointments', icon: FiCalendar },
  ];

  const dateRanges = [
    { id: 'today', name: 'Today' },
    { id: 'yesterday', name: 'Yesterday' },
    { id: 'this_week', name: 'This Week' },
    { id: 'last_week', name: 'Last Week' },
    { id: 'this_month', name: 'This Month' },
    { id: 'last_month', name: 'Last Month' },
    { id: 'custom', name: 'Custom Range' },
  ];

  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">Track and analyze your platform's performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {/* <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg> */}
              </div>
            </div>
            <button 
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center text-sm font-medium hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <FiRefreshCw className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FiBarChart2 className="mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <nav className="flex overflow-x-auto">
            {reportTabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.id}
                className={({ isActive }) => `
                  ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                  px-6 py-4 border-b-2 font-medium text-sm flex items-center whitespace-nowrap transition-colors
                `}
              >
                <tab.icon className="mr-2" />
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {reportTabs.find(tab => tab.id === activeTab)?.name || 'Report'}
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                  <FiFilter className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                  <FiDownload className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                  <FiPrinter className="h-5 w-5" />
                </button>
              </div>
            </div>
            <Outlet context={{ dateRange }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;