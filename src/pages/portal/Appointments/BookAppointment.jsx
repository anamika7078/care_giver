// f:\React\family_caregive\FRONTEND\src\pages\portal\Appointments\BookAppointment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiPlus } from 'react-icons/fi';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appointmentType: '',
    doctor: '',
    familyMember: '',
    date: '',
    time: '',
    reason: ''
  });

  // Mock data
  const appointmentTypes = ['General Checkup', 'Consultation', 'Follow-up', 'Dental', 'Other'];
  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];
  const availableDates = getNext7Days();
  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];

  function getNext7Days() {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      result.push(date.toISOString().split('T')[0]);
    }
    return result;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Booking:', formData);
      // Add API call here
      navigate('/portal/appointments');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            Back
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Book New Appointment
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Fill in the details to schedule a new appointment
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6">
              <div className="flex items-center">
                {[1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {i}
                    </div>
                    {i < 3 && (
                      <div className="flex-1 h-1 mx-2 bg-gray-200">
                        <div
                          className={`h-1 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`}
                        ></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Details</span>
                <span>Date & Time</span>
                <span>Confirm</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type of Appointment
                    </label>
                    <select
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select type</option>
                      {appointmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Doctor
                    </label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor} value={doctor}>{doctor}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reason for Visit
                    </label>
                    <textarea
                      name="reason"
                      rows={3}
                      value={formData.reason}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Briefly describe the reason for your visit"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {availableDates.map(date => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, date }))}
                          className={`py-2 px-3 border rounded-md text-sm font-medium ${
                            formData.date === date
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.date && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Times
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, time }))}
                            className={`py-2 px-3 border rounded-md text-sm font-medium ${
                              formData.time === time
                                ? 'bg-blue-50 border-blue-500 text-blue-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Appointment Summary</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><span className="font-medium">Type:</span> {formData.appointmentType}</p>
                      <p><span className="font-medium">Doctor:</span> {formData.doctor}</p>
                      <p><span className="font-medium">Date:</span> {formData.date} at {formData.time}</p>
                      <p><span className="font-medium">Reason:</span> {formData.reason || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                        required
                      />
                      <span className="ml-2 block text-sm text-gray-700">
                        I confirm that the information provided is accurate
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {step === 3 ? 'Confirm Booking' : 'Continue'}
                    <FiPlus className="ml-2 -mr-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;