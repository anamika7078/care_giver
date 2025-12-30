import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  phone: "",
  service: "Home Visit",
  date: "",
  notes: "",
};

const BookingForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Please log in to book a service');
      }

      // Prepare the booking data
      const bookingData = {
        ...form,
        // Add any additional fields required by your API
        status: 'pending'
      };

      // Make the API call
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        bookingData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Show success message
      toast.success('Booking request submitted successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset the form and call onSuccess callback if provided
      setForm(initialState);
      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit booking';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#2f2235]">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-[#2f2235]">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="service" className="text-sm font-semibold text-[#2f2235]">
          Service
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        >
          <option>Home Visit</option>
          <option>Telehealth Check-in</option>
          <option>Care Coordination</option>
          <option>Caregiver Training</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-semibold text-[#2f2235]">
          Preferred date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-semibold text-[#2f2235]">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any details we should know"
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      {/* Error message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Request Booking'
        )}
      </button>
    </form>
  );
};

export default BookingForm;

