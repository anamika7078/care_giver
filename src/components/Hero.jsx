import React from 'react';
// import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShield, FiClock, FiStar } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              Find Trusted <span className="text-primary-600">Caregivers</span> Near You
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg">
              Connecting families with compassionate and experienced caregivers for your loved ones. Quality care starts here.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-xl shadow-lg p-1 mb-8 max-w-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="relative flex-1 mb-2 md:mb-0 md:mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="block w-full pl-10 pr-3 py-4 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-6 rounded-lg transition-colors whitespace-nowrap">
                  Find Caregivers
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-lg mr-3">
                  <FiUser className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">10,000+</p>
                  <p className="text-sm text-neutral-600">Caregivers</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <FiShield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">100%</p>
                  <p className="text-sm text-neutral-600">Verified</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <FiStar className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">4.9/5</p>
                  <p className="text-sm text-neutral-600">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 inline-block shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Happy senior with caregiver"
                  className="rounded-2xl w-full h-auto"
                />
              </div>

              {/* Floating card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FiClock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">24/7 Availability</p>
                    <p className="text-sm text-neutral-600">Care when you need it</p>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <FiStar className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Top Rated</p>
                    <p className="text-sm text-neutral-600">4.9/5 from 1,200+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
