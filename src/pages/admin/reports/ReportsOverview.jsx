// src/pages/admin/reports/ReportsOverview.jsx
import React from 'react';
import { 
  FiDollarSign, 
  FiUsers, 
  FiCalendar, 
  FiThumbsUp, 
  FiTrendingUp,
  FiActivity,
  FiClock
} from 'react-icons/fi';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportsOverview = () => {
  // Stats data with colors and icons
  const stats = [
    { 
      name: 'Total Revenue', 
      value: '$45,231', 
      change: '+12%', 
      changeType: 'increase',
      icon: FiDollarSign,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      name: 'Active Caregivers', 
      value: '24', 
      change: '+2%', 
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    { 
      name: 'Appointments', 
      value: '1,234', 
      change: '+19%', 
      changeType: 'increase',
      icon: FiCalendar,
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      name: 'Satisfaction', 
      value: '98%', 
      change: '+1%', 
      changeType: 'increase',
      icon: FiThumbsUp,
      color: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const appointmentsData = {
    labels: ['Completed', 'Upcoming', 'Cancelled', 'Rescheduled'],
    datasets: [
      {
        label: 'Appointments',
        data: [850, 300, 84, 100],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderRadius: 4
      }
    ]
  };

  const userDistributionData = {
    labels: ['Caregivers', 'Seniors', 'Family Members', 'Admins'],
    datasets: [
      {
        data: [35, 45, 15, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  // Recent activities
  const activities = [
    { id: 1, user: 'John Doe', action: 'completed a visit', time: '2 hours ago', icon: FiActivity },
    { id: 2, user: 'Sarah Smith', action: 'updated profile', time: '3 hours ago', icon: FiUsers },
    { id: 3, user: 'Mike Johnson', action: 'requested time off', time: '5 hours ago', icon: FiClock },
    { id: 4, user: 'Emily Davis', action: 'sent a message', time: '1 day ago', icon: FiActivity },
  ];

  return (
    <div className="space-y-6 pt-6 px-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className={`mt-2 flex items-center ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    <FiTrendingUp className="mr-1" />
                    <span className="text-sm font-medium">{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} ${stat.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Monthly
              </span>
            </div>
          </div>
          <div className="h-80">
            <Line 
              data={revenueData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
            <div className="text-sm text-gray-500">Last 30 days</div>
          </div>
          <div className="h-80">
            <Bar 
              data={appointmentsData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
                    },
                    ticks: {
                      stepSize: 200
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Distribution</h3>
          <div className="h-64">
            <Pie 
              data={userDistributionData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-200 hover:border-blue-600 transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;