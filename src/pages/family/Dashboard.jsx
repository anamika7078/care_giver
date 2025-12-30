import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiUsers,
    FiCalendar,
    FiAlertTriangle,
    FiHeart,
    FiCheckCircle,
    FiFileText,
    FiUserPlus
} from 'react-icons/fi';

const FamilyDashboard = () => {
    // Mock data - replace with actual data from your API
    const stats = [
        {
            title: 'Elderly Members',
            value: '3',
            icon: <FiUsers className="h-8 w-8 text-blue-500" />,
            change: '+1 from last month',
            link: '/family/elders'
        },
        {
            title: 'Upcoming Appointments',
            value: '2',
            icon: <FiCalendar className="h-8 w-8 text-green-500" />,
            change: 'Next: Tomorrow, 10 AM',
            link: '/family/book-service'
        },
        {
            title: 'Active Care Plans',
            value: '1',
            icon: <FiFileText className="h-8 w-8 text-purple-500" />,
            change: 'All up to date',
            link: '/family/documents'
        },
        {
            title: 'Emergencies',
            value: '0',
            icon: <FiAlertTriangle className="h-8 w-8 text-red-500" />,
            change: 'No active alerts',
            link: '/family/emergency'
        }
    ];

    const recentActivities = [
        {
            id: 1,
            title: 'New care plan created',
            description: 'Monthly checkup plan for Mom',
            time: '2 hours ago',
            icon: <FiFileText className="h-5 w-5 text-blue-500" />
        },
        {
            id: 2,
            title: 'Appointment scheduled',
            description: 'Doctor visit on Dec 28, 10 AM',
            time: '1 day ago',
            icon: <FiCalendar className="h-5 w-5 text-green-500" />
        },
        {
            id: 3,
            title: 'Medication reminder',
            description: 'Morning medication for Dad',
            time: 'Today, 8:00 AM',
            icon: <FiHeart className="h-5 w-5 text-red-500" />
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Welcome back!</h2>
                        <p className="mt-1 opacity-90">Here's what's happening with your family care today.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                            <FiHeart className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <Link to={stat.link} className="block">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                                    <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                                </div>
                                <div className="p-3 rounded-full bg-blue-50">
                                    {stat.icon}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                        <Link to="/family/activities" className="text-sm text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="p-2 rounded-full bg-blue-50">
                                    {activity.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                                    <p className="text-sm text-gray-500">{activity.description}</p>
                                </div>
                                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-md"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link
                            to="/family/book-service"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
                        >
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                                <FiCalendar className="h-5 w-5" />
                            </div>
                            <span className="font-medium">Book a Service</span>
                        </Link>
                        <Link
                            to="/family/add-member"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
                        >
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                <FiUserPlus className="h-5 w-5" />
                            </div>
                            <span className="font-medium">Add Family Member</span>
                        </Link>
                        <Link
                            to="/family/emergency"
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors border border-red-200"
                        >
                            <div className="p-2 rounded-full bg-red-100 text-red-600">
                                <FiAlertTriangle className="h-5 w-5" />
                            </div>
                            <span className="font-medium">Emergency Contacts</span>
                        </Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Health Tips</h4>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Ensure all medications are taken on time today.</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-600">Schedule monthly health check-up for all family members.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FamilyDashboard;
