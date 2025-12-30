import React from 'react';
import { Link } from 'react-router-dom';

const EmergencyCare = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner Image */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Emergency Care"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Emergency Care
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            24/7 emergency response and medical assistance when you need it most
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Request Emergency Assistance
            </Link>
            <a
              href="tel:+18005551234"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now: (800) 555-1234
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">24/7 Emergency Medical Response</h2>
            <p className="mt-1 max-w-2xl text-gray-600">
              Immediate assistance for medical emergencies, anytime, anywhere.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Service Coverage</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Available 24 hours a day, 7 days a week, 365 days a year
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Response Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Immediate response with our dedicated emergency hotline
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Medical Team</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Experienced emergency medical professionals on call
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Emergency Services</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Medical Emergency Response',
                description: 'Immediate medical attention for critical situations',
                icon: '🚑'
              },
              {
                title: 'Ambulance Dispatch',
                description: 'Rapid ambulance service when hospital transport is needed',
                icon: '🚨'
              },
              {
                title: 'Doctor Consultation',
                description: '24/7 access to emergency medical consultation',
                icon: '👨‍⚕️'
              },
              {
                title: 'Medication Assistance',
                description: 'Emergency medication delivery when needed',
                icon: '💊'
              },
              {
                title: 'Hospital Coordination',
                description: 'Seamless coordination with hospitals for admission',
                icon: '🏥'
              },
              {
                title: 'Family Notification',
                description: 'Immediate notification to family members',
                icon: '👪'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                      <p className="mt-1 text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="mt-16 bg-blue-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 text-center">
            <h2 className="text-3xl font-extrabold text-white">Need Immediate Assistance?</h2>
            <p className="mt-4 text-xl text-blue-100">
              Our emergency response team is available 24/7 to help you
            </p>
            <div className="mt-8">
              <a
                href="tel:+18005551234"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Emergency Hotline
              </a>
              <p className="mt-4 text-blue-200">Available 24/7 • Response time under 2 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCare;