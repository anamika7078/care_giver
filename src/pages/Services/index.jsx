// src/pages/Services/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'parents-assistance',
    title: 'Parents Assistance',
    description: 'Comprehensive care and support for your elderly parents',
    icon: '👵👴',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'medical-assistance',
    title: 'Medical Assistance',
    description: 'Professional medical care and health monitoring services',
    icon: '🏥',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 'home-care',
    title: 'Home Care',
    description: 'Compassionate in-home care for your loved ones',
    icon: '🏠',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'nri-assistance',
    title: 'NRI Assistance',
    description: 'Dedicated support for NRIs caring for family back home',
    icon: '🌎',
    bgColor: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    id: 'travel-care',
    title: 'Travel Care',
    description: 'Safe and comfortable travel assistance for seniors',
    icon: '✈️',
    bgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    id: 'emergency-care',
    title: 'Emergency Care',
    description: '24/7 emergency response and medical assistance',
    icon: '🚑',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 'scam-awareness',
    title: 'Scam Awareness',
    description: 'Protecting seniors from financial scams and fraud',
    icon: '🛡️',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: 'billing-tasks',
    title: 'Billing & Tasks',
    description: 'Managing payments and routine tasks for your loved ones',
    icon: '💳',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];
const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Zz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
              Comprehensive care solutions tailored to your family's needs
            </p>
          </motion.div>
        </div>
      </div>
      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className="block h-full"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className={`h-2 ${service.bgColor}`}></div>
                    <div className="p-8 flex-grow">
                      <div className={`w-20 h-20 rounded-full ${service.bgColor} flex items-center justify-center text-4xl mb-6 mx-auto`}>
                        <span className={service.iconColor}>{service.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-center text-gray-800 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-center text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="px-6 pb-6 pt-2 text-center">
                      <span className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group-hover:translate-x-1">
                        Learn more
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          {/* CTA Section */}
          <motion.div 
            className="mt-24 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Zz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PC9nPjwvc3ZnPg==')]"></div>
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Need Help Choosing a Service?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Our care coordinators are available 24/7 to help you find the perfect care solution for your loved ones.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link
                  to="/contact"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+18005551234"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Call Now: (800) 555-1234
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default Services;