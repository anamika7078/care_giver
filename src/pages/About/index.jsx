// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaHandsHelping, FaUsers, FaClinicMedical } from 'react-icons/fa';

const features = [
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To provide compassionate, high-quality care that enhances the lives of seniors and supports their families with dignity and respect.',
    icon: <FaHeart className="text-4xl text-red-500" />,
    bgColor: 'bg-red-100'
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To be the most trusted partner in senior care, setting the standard for excellence in home healthcare services nationwide.',
    icon: <FaClinicMedical className="text-4xl text-blue-500" />,
    bgColor: 'bg-blue-100'
  },
  {
    id: 'values',
    title: 'Our Values',
    description: 'Compassion, integrity, excellence, and respect guide everything we do in serving our clients and their families.',
    icon: <FaHandsHelping className="text-4xl text-green-500" />,
    bgColor: 'bg-green-100'
  },
  {
    id: 'team',
    title: 'Our Team',
    description: 'Compassionate professionals dedicated to providing personalized care with expertise and empathy.',
    icon: <FaUsers className="text-4xl text-purple-500" />,
    bgColor: 'bg-purple-100'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Zz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PGNpcmNsZSBjeD0iMTIiIHk9IjEyIiByPSI0Ij48L2NpcmNsZT48L2c+PC9zdmc+')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white pt-8">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
              Compassionate care for your loved ones, right at home
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start">
                    <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mr-6 flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-20">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Founded in 2020, Family Caregive began with a simple mission: to provide compassionate, 
                      high-quality care for seniors in the comfort of their own homes. What started as a small 
                      team of dedicated caregivers has grown into a trusted name in home healthcare.
                    </p>
                    <p>
                      Our journey has been guided by the belief that everyone deserves to age with dignity and 
                      independence. We've helped thousands of families navigate the challenges of aging, 
                      providing not just care, but companionship and peace of mind.
                    </p>
                    <p>
                      Today, we continue to expand our services and reach, always staying true to our core 
                      values of compassion, integrity, and excellence in care.
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="md:w-1/2 bg-gray-100 min-h-[400px]">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-cover bg-center" 
                     style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")' }}>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden"
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
                Ready to Learn More?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover how our compassionate care can make a difference in your loved one's life.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <Link
                  to="/contact"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;