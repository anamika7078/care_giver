// src/pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const contactInfo = [
  {
    id: 'address',
    title: 'Our Location',
    description: '123 Caregiving Street, Suite 100\nNew York, NY 10001',
    icon: <FaMapMarkerAlt className="text-4xl text-blue-500" />,
    bgColor: 'bg-blue-50'
  },
  {
    id: 'phone',
    title: 'Phone Number',
    description: '+1 (800) 555-1234\n+1 (800) 555-5678',
    icon: <FaPhoneAlt className="text-4xl text-green-500" />,
    bgColor: 'bg-green-50'
  },
  {
    id: 'email',
    title: 'Email Address',
    description: 'info@familycaregive.com\nsupport@familycaregive.com',
    icon: <FaEnvelope className="text-4xl text-amber-500" />,
    bgColor: 'bg-amber-50'
  },
  {
    id: 'hours',
    title: 'Working Hours',
    description: 'Monday - Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
    icon: <FaClock className="text-4xl text-purple-500" />,
    bgColor: 'bg-purple-50'
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/elderly-care-bg.jpg)',
              opacity: 0.3
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/80 to-gold-800/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gold-100 max-w-3xl mx-auto"
          >
            We're here to help and answer any questions you might have
          </motion.p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 h-full flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mb-6 text-gold-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 whitespace-pre-line text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16 border border-gray-100">
          <div className="md:flex">
            {/* Contact Form */}
            <div className="md:w-1/2 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-16"
                >
                  <ContactForm />
                </motion.div>
              </motion.div>
            </div>

            {/* Map */}
            <div className="md:w-1/2 bg-gray-100 min-h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.21501970292!2d-73.98784492446592!3d40.750857071436946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAzLjEiTiA3M8KwNTknMTAuMiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-gold-600 to-gold-800 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Need Immediate Assistance?
            </h2>
            <p className="text-gold-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Our care coordinators are available 24/7 to answer your questions and provide support.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="tel:+18005551234"
                className="bg-white text-gold-700 hover:bg-gold-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Call Now: (800) 555-1234
              </a>
              <a
                href="mailto:info@familycaregive.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;