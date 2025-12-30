import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const TestimonialCard = ({ name, role, message, icon: Icon }) => {
  // Generate random pastel color for avatar
  const getRandomColor = () => {
    const colors = [
      'from-amber-200 to-amber-100',
      'from-blue-200 to-blue-100',
      'from-emerald-200 to-emerald-100',
      'from-rose-200 to-rose-100',
      'from-violet-200 to-violet-100',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarInitial = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colorClass = getRandomColor();

  return (
    <motion.div 
      className="relative group h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Decorative elements */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500 to-gold-700 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"></div>
      
      <div className="relative h-full bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg overflow-hidden border border-gray-100">
        {/* Top section with quote and rating */}
        <div className="relative z-10">
          {/* Decorative quote icon */}
          <div className="absolute -top-2 -left-2 text-gray-100 text-7xl -z-10">
            <FaQuoteLeft />
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar 
                key={star} 
                className="w-5 h-5 text-amber-400" 
                aria-hidden="true" 
              />
            ))}
          </div>
          
          {/* Testimonial text */}
          <p className="text-gray-800 text-lg leading-relaxed mb-8 relative z-10 font-light">
            {message}
          </p>
        </div>
        
        {/* Author section */}
        <div className="flex items-center mt-8 pt-6 border-t border-gray-100">
          {/* Avatar with gradient background */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-xl font-bold text-gray-700 shadow-sm`}>
            {avatarInitial}
          </div>
          
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-gold-700 font-medium text-sm">{role}</p>
          </div>
          
          {/* Decorative icon */}
          <div className="ml-auto text-gray-300 group-hover:text-gold-500 transition-colors duration-300">
            {Icon && <Icon className="w-8 h-8" />}
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-gray-50/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;