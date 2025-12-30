// src/pages/admin/reports/Financial.jsx
import React from 'react';

const FinancialReports = () => {
  // Sample data
  const financialData = [
    { month: 'Jan', revenue: 12000, expenses: 8500, profit: 3500 },
    { month: 'Feb', revenue: 15000, expenses: 9200, profit: 5800 },
    { month: 'Mar', revenue: 18000, expenses: 11000, profit: 7000 },
    { month: 'Apr', revenue: 16000, expenses: 9500, profit: 6500 },
    { month: 'May', revenue: 20000, expenses: 12500, profit: 7500 },
    { month: 'Jun', revenue: 22000, expenses: 13000, profit: 9000 },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Financial Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$103,000</p>
              <p className="text-sm text-green-600">+12.5% from last period</p>
            </div>
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900">$63,700</p>
              <p className="text-sm text-red-600">+8.2% from last period</p>
            </div>
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Expenses chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profit</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-2xl font-semibold text-gray-900">$39,300</p>
              <p className="text-sm text-green-600">+18.7% from last period</p>
            </div>
            <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Profit chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;