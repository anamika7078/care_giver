import React from 'react';

const Appointments = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Appointments</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Schedule Appointment
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Appointments calendar and list will go here */}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
