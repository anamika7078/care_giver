// src/components/HeroCarousel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

const heroImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505751172876-fa186e6446a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Compassionate Care for Your Loved Ones',
    subtitle: 'Professional and loving care services for seniors in the comfort of their home'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1573497491208-465d453a0fbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Expert Medical Assistance',
    subtitle: 'Qualified professionals providing the best care for your family members'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: '24/7 Emergency Support',
    subtitle: 'We are always here when you need us the most'
  }
];

const HeroCarousel = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh]">
      <Splide
        options={{
          type: 'fade',
          rewind: true,
          autoplay: true,
          interval: 5000,
          speed: 1000,
          pauseOnHover: false,
          arrows: false,
          pagination: false,
        }}
        aria-label="Hero Carousel"
      >
        {heroImages.map((slide) => (
          <SplideSlide key={slide.id} className="relative h-[70vh] md:h-[80vh]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-900/90 to-accent-800/80" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    <span className="text-white">{slide.title.split('for ')[0]}</span>
                    <span className="text-gold-300">for {slide.title.split('for ')[1]}</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a 
                      href="/services" 
                      className="flex items-center bg-gold-500 hover:bg-gold-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Get Started <FiArrowRight className="ml-2" />
                    </a>
                    <a 
                      href="/about" 
                      className="flex items-center bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                    >
                      <FiInfo className="mr-2" /> Learn More
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      
      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mb-10">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '500+', label: 'Happy Clients' },
              { number: '50+', label: 'Expert Caregivers' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-lg"
              >
                <div className="text-3xl font-bold text-gold-400 mb-1">{stat.number}</div>
                <div className="text-white/90 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;