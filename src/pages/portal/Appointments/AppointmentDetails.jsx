// f:\React\family_caregive\FRONTEND\src\pages\portal\Appointments\AppointmentDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiEdit, 
  FiTrash2,
  FiMessageSquare,
  FiPrinter,
  FiDownload
} from 'react-icons/fi';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchAppointment = async () => {
      try {
        // Replace with actual API call
        const mockAppointments = {
          1: {
            id: 1,
            title: 'Annual Checkup',
            date: '2023-07-15',
            time: '10:00 AM',
            duration: '60 minutes',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'General Medicine',
            status: 'confirmed',
            location: 'Main Hospital, Room 304',
            address: '123 Medical Center Dr, City, State 12345',
            phone: '(555) 123-4567',
            notes: 'Please bring your insurance card and a list of current medications.',
            elder: { id: 1, name: 'John Doe', relationship: 'Father' }
          },
          2: {
            id: 2,
            title: 'Dental Cleaning',
            date: '2023-07-20',
            time: '2:30 PM',
            duration: '45 minutes',
            doctor: 'Dr. Michael Chen',
            specialty: 'Dentistry',
            status: 'scheduled',
            location: 'Dental Clinic, Suite 102',
            address: '456 Dental Ave, City, State 12345',
            phone: '(555) 987-6543',
            notes: 'Regular cleaning and checkup.',
            elder: { id: 1, name: 'John Doe', relationship: 'Father' }
          }
        };
        
        // Simulate network delay
        setTimeout(() => {
          setAppointment(mockAppointments[id] || null);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = () => {
    // Handle delete logic
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Call API to delete
      console.log('Appointment cancelled:', id);
      navigate('/portal/appointments');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Appointment not found</h3>
          <p className="mt-1 text-sm text-gray-500">The requested appointment could not be found.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/portal/appointments')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiArrowLeft className="-ml-1 mr-2 h-5 w-5" />
              Back to Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Back to Appointments
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {appointment.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {appointment.doctor} • {appointment.specialty}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Link
                  to={`/portal/appointments/${id}/reschedule`}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiEdit className="-ml-0.5 mr-2 h-4 w-4" />
                  Reschedule
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiTrash2 className="-ml-0.5 mr-2 h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{appointment.date} at {appointment.time}</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <FiClock className="mr-2 h-5 w-5 text-gray-400" />
                    <span>{appointment.duration}</span>
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-start">
                    <FiMapPin className="mr-2 h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{appointment.location}</p>
                      <p className="text-gray-500">{appointment.address}</p>
                      <p className="mt-1 flex items-center text-gray-500">
                        <FiPhone className="mr-2 h-4 w-4" />
                        {appointment.phone}
                      </p>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Family Member</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.elder.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.elder.relationship}
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
              {appointment.notes && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {appointment.notes}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiMessageSquare className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Message
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPrinter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Print
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiDownload className="-ml-1 mr-2 h-5 w-5" />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;