import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';

// Background image URL (using a free stock image)
const backgroundImage = 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Basic Care',
      price: '₹ 4,999',
      duration: 'per month',
      features: [
        '2 hours daily (60 hours/month)',
        'Meal Preparation',
        'Medication Reminders',
        'Light Housekeeping',
        'Companionship',
        'Bathing Assistance',
        'Dressing Assistance',
        'Mobility Support',
        'Meal Assistance',
        'Laundry',
        'Grocery Shopping',
        'Doctor Appointments',
        '24/7 Emergency Support',
        'Monthly Health Check-up',
        'Personal Care Kit'
      ],
      included: [
        true, true, true, true, true, false, false, false, false, false, false, false, false, false
      ]
    },
    {
      name: 'Standard Care',
      price: '₹ 8,999',
      duration: 'per month',
      features: [
        '4 hours daily (120 hours/month)',
        'Meal Preparation',
        'Medication Reminders',
        'Light Housekeeping',
        'Companionship',
        'Bathing Assistance',
        'Dressing Assistance',
        'Mobility Support',
        'Meal Assistance',
        'Laundry',
        'Grocery Shopping',
        'Doctor Appointments',
        '24/7 Emergency Support',
        'Monthly Health Check-up',
        'Personal Care Kit'
      ],
      included: [
        true, true, true, true, true, true, true, true, true, true, true, false, false, false
      ],
      popular: true
    },
    {
      name: 'Comprehensive Care',
      price: '₹ 14,999',
      duration: 'per month',
      features: [
        '8 hours daily (240 hours/month)',
        'Meal Preparation',
        'Medication Reminders',
        'Light Housekeeping',
        'Companionship',
        'Bathing Assistance',
        'Dressing Assistance',
        'Mobility Support',
        'Meal Assistance',
        'Laundry',
        'Grocery Shopping',
        'Doctor Appointments',
        '24/7 Emergency Support',
        'Monthly Health Check-up',
        'Personal Care Kit'
      ],
      included: [
        true, true, true, true, true, true, true, true, true, true, true, true, true, true
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100  pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/80 to-gold-800/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our Care Plans
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gold-100 max-w-3xl mx-auto"
          >
            Choose the perfect care plan that fits your loved one's needs with our flexible options
          </motion.p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="relative py-16">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.9)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-gold-500 transform scale-105 z-10' : 'border border-gray-200'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gold-500 text-white text-xs font-semibold px-3 py-1 transform translate-x-2 -translate-y-2 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-500">{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {plan.included[idx] ? (
                          <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <FiX className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`${!plan.included[idx] ? 'text-gray-400' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium ${plan.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
                      } transition-all duration-300`}
                  >
                    Get Started
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything You Need for Complete Care
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our care plans are designed to provide comprehensive support for your loved ones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Care',
                description: 'Tailored care plans to meet individual needs and preferences.',
                icon: '👵'
              },
              {
                title: 'Trained Caregivers',
                description: 'Experienced and compassionate caregivers who are thoroughly vetted.',
                icon: '👩‍⚕️'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance for any emergencies or concerns.',
                icon: '🔄'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;