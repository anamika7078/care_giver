// f:\React\family_caregive\FRONTEND\src\pages\portal\Appointments\AppointmentsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiPlus, FiSearch, FiPhone, FiUser, FiFilter } from 'react-icons/fi';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Simulate API call
        const mockAppointments = [
          {
            id: 1,
            title: 'Annual Checkup',
            date: '2023-07-15',
            time: '10:00 AM',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'General Medicine',
            status: 'confirmed',
            elder: { id: 1, name: 'John Doe' }
          },
          {
            id: 2,
            title: 'Dental Cleaning',
            date: '2023-07-20',
            time: '2:30 PM',
            doctor: 'Dr. Michael Chen',
            specialty: 'Dentistry',
            status: 'scheduled',
            elder: { id: 1, name: 'John Doe' }
          },
          {
            id: 3,
            title: 'Eye Examination',
            date: '2023-07-22',
            time: '11:15 AM',
            doctor: 'Dr. Emily Wilson',
            specialty: 'Ophthalmology',
            status: 'pending',
            elder: { id: 2, name: 'Jane Smith' }
          }
        ];
        setAppointments(mockAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(apt => 
    apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.elder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusMap = {
      confirmed: 'bg-green-100 text-green-800',
      scheduled: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status] || 'bg-gray-100'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and schedule medical appointments
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/portal/book-appointment"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              New Appointment
            </Link>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="relative rounded-md shadow-sm w-full sm:w-80 mb-4 sm:mb-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md h-10"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiFilter className="mr-2 h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by scheduling a new appointment.
              </p>
              <div className="mt-6">
                <Link
                  to="/portal/book-appointment"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  New Appointment
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="hover:bg-gray-50">
                  <Link to={`/portal/appointments/${appointment.id}`} className="block">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiCalendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.doctor} • {appointment.specialty}
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.date} at {appointment.time}
                          </div>
                          <div className="mt-1">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <FiUser className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {appointment.elder.name}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {appointment.duration || '30 mins'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;