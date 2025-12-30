import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/Forms/BookingForm';

const Bookings = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNewBookingClick = () => {
    setShowForm(true);
  };

  const handleBookingSuccess = () => {
    setShowForm(false);
    // Optionally refresh the bookings list here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {showForm ? 'New Booking' : 'Service Bookings'}
          </h1>
          {!showForm && (
            <button
              onClick={handleNewBookingClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Booking
            </button>
          )}
        </div>

        {showForm ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <BookingForm onSuccess={handleBookingSuccess} />
            <div className="mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back to List
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Bookings list will go here */}
            <div className="p-6 text-center text-gray-500">
              <p className="mb-4">You don't have any bookings yet.</p>
              <button
                onClick={handleNewBookingClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book Your First Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
