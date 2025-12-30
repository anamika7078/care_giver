// src/pages/admin/Dashboard.jsx

import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiAlertCircle,
  FiTrendingUp,
  FiActivity,
  FiClock,
  FiAward
} from 'react-icons/fi';
import { Line, Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  // Stats Data
  const stats = [
    {
      name: 'Total Caregivers',
      value: '24',
      icon: FiUsers,
      change: '+12%',
      changeType: 'increase',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      name: 'Active Bookings',
      value: '156',
      icon: FiCalendar,
      change: '+5%',
      changeType: 'increase',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      name: 'Monthly Revenue',
      value: '$12,450',
      icon: FiDollarSign,
      change: '+8.2%',
      changeType: 'increase',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'Pending Requests',
      value: '8',
      icon: FiAlertCircle,
      change: '-2',
      changeType: 'decrease',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  // Line Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 90],
        borderColor: 'rgba(245, 158, 11, 1)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Active Bookings',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Appointments',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderRadius: 4
      },
      {
        label: 'Completed',
        data: [8, 12, 2, 4, 2, 1, 6],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 4
      }
    ]
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ['Caregivers', 'Seniors', 'Family Members', 'Admin'],
    datasets: [
      {
        data: [35, 45, 15, 5],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  // Recent Activities
  const activities = [
    { id: 1, user: 'John Doe', action: 'created a new booking', time: '5 min ago', icon: FiCalendar },
    { id: 2, user: 'Sarah Smith', action: 'updated profile information', time: '1 hour ago', icon: FiUsers },
    { id: 3, user: 'Mike Johnson', action: 'completed a training module', time: '2 hours ago', icon: FiAward },
    { id: 4, user: 'Emily Davis', action: 'requested time off', time: '5 hours ago', icon: FiClock },
    { id: 5, user: 'David Wilson', action: 'sent a message', time: '1 day ago', icon: FiActivity }
  ];

  return (
    <div className="p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/light-wool.png')] opacity-10"></div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-amber-50 to-yellow-50"></div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hover:shadow-lg hover:border-white/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`mt-2 flex items-center ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  <FiTrendingUp className="mr-1" />
                  <span className="text-sm font-medium">{stat.change} from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hover:shadow-lg hover:border-white/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-80">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
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

        {/* Bar Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hover:shadow-lg hover:border-white/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Appointments</h2>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last 4 Weeks</option>
            </select>
          </div>
          <div className="h-80">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hover:shadow-lg hover:border-white/40 transition-all duration-300 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">User Distribution</h2>
          <div className="h-64">
            <Pie
              data={pieChartData}
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
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hover:shadow-lg hover:border-white/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg ${activity.icon === FiCalendar ? 'bg-amber-50 text-amber-600' :
                  activity.icon === FiUsers ? 'bg-purple-50 text-purple-600' :
                    activity.icon === FiAward ? 'bg-green-50 text-green-600' :
                      activity.icon === FiClock ? 'bg-yellow-50 text-yellow-600' :
                        'bg-gray-50 text-gray-600'}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
