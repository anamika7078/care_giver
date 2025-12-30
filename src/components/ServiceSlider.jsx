// src/components/ServicesSlider.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

const services = [
  {
    id: "medical-assistance",
    title: "Medical Assistance",
    description: "Professional medical care and health monitoring services",
    icon: "🏥"
  },
  {
    id: "home-care",
    title: "Home Care",
    description: "Compassionate in-home care for your loved ones",
    icon: "🏠"
  },
  {
    id: "emergency-care",
    title: "Emergency Care",
    description: "24/7 emergency response and medical assistance",
    icon: "🚑"
  },
  {
    id: "elderly-care",
    title: "Elderly Care",
    description: "Specialized care for senior citizens",
    icon: "👵"
  },
  {
    id: "nursing-care",
    title: "Nursing Care",
    description: "Professional nursing services at home",
    icon: "💉"
  },
  {
    id: "therapy",
    title: "Therapy",
    description: "Physical and occupational therapy services",
    icon: "🧘"
  }
];

const ServicesSlider = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="px-4">
          <Splide
            options={{
              type: 'loop',
              perPage: 3,
              perMove: 1,
              gap: '2rem',
              autoplay: true,
              interval: 3000,
              pauseOnHover: true,
              breakpoints: {
                1024: {
                  perPage: 2,
                },
                768: {
                  perPage: 1,
                },
              }
            }}
            aria-label="Our Services"
          >
            {services.map((service, index) => (
              <SplideSlide key={service.id}>
                <motion.div 
                  className="h-full p-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="p-8 text-center flex-grow">
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                    <div className="p-4 bg-gray-50 text-center">
                      <a 
                        href={`/services/${service.id}`} 
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Learn More →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;