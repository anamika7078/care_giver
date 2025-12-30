// f:\React\family_caregive\FRONTEND\src\pages\portal\Appointments\RescheduleAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiX } from 'react-icons/fi';

const RescheduleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  useEffect(() => {
    // Simulate API call to fetch appointment details
    const fetchAppointment = async () => {
      try {
        // Replace with actual API call
        const mockAppointments = {
          1: {
            id: 1,
            title: 'Annual Checkup',
            date: '2023-07-15',
            time: '10:00 AM',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'General Medicine',
            elder: { id: 1, name: 'John Doe' }
          },
          2: {
            id: 2,
            title: 'Dental Cleaning',
            date: '2023-07-20',
            time: '2:30 PM',
            doctor: 'Dr. Michael Chen',
            specialty: 'Dentistry',
            elder: { id: 1, name: 'John Doe' }
          }
        };
        
        setTimeout(() => {
          const apt = mockAppointments[id];
          if (apt) {
            setAppointment(apt);
            // Set default selected date to current date
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
            // Generate some available slots
            setAvailableSlots(timeSlots);
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // In a real app, you would fetch available slots for the selected date
    setAvailableSlots(timeSlots); // For demo, using the same slots
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Appointment rescheduled:', {
        id,
        newDate: selectedDate,
        newTime: selectedTime
      });
      setIsSubmitting(false);
      // Show success message and redirect
      alert('Appointment rescheduled successfully!');
      navigate(`/portal/appointments/${id}`);
    }, 1000);
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Back to Appointment
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Reschedule Appointment
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Select a new date and time for your appointment
            </p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Current Appointment</h4>
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiCalendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{appointment.title}</p>
                  <p className="text-gray-500">{appointment.doctor}</p>
                  <p className="text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 border rounded-md text-sm font-medium ${
                          selectedTime === time
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {selectedTime && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <FiClock className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-blue-800">
                          Selected: {selectedTime}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedTime('')}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedTime || isSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : 'Reschedule Appointment'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;