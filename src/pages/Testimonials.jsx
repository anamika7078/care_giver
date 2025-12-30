import React, { useEffect, useRef, useState, useCallback } from "react";
import TestimonialCard from "../components/TestimonialCard";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaQuoteRight, FaHandHoldingHeart, FaUserMd, FaHome, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = {
  family: [
    {
      name: "Sarah Johnson",
      role: "Daughter",
      message: "The caregivers have been a blessing for our family. They treat my mother with such kindness and respect, and I can see the positive impact on her daily life.",
    },
    {
      name: "Michael Chen",
      role: "Son",
      message: "Having professional care for my father has given our family peace of mind. The team is reliable, compassionate, and truly cares about his well-being.",
    },
    {
      name: "Elena Rodriguez",
      role: "Wife",
      message: "The personalized care plan for my husband has made all the difference. The caregivers are attentive to his needs and keep me informed about everything.",
    },
  ],
  caregivers: [
    {
      name: "James Wilson",
      role: "Certified Caregiver",
      message: "Working with this agency has been incredibly rewarding. They provide excellent support and training, allowing me to focus on delivering the best care possible.",
    },
    {
      name: "Aisha Patel",
      role: "Nurse Practitioner",
      message: "The coordination between our medical team and the caregivers is seamless. It's a pleasure working with professionals who truly understand patient care.",
    },
    {
      name: "David Kim",
      role: "Therapist",
      message: "I've seen remarkable progress in my patients who receive consistent care from this team. Their dedication to holistic well-being is impressive.",
    },
  ],
  healthcare: [
    {
      name: "Dr. Robert Taylor",
      role: "Geriatric Specialist",
      message: "In my 20 years of practice, I've rarely seen a care provider with such attention to detail and patient-centered approach. They're setting new standards in elderly care.",
    },
    {
      name: "Dr. Lisa Wong",
      role: "Neurologist",
      message: "The cognitive care program is exceptional. My patients with memory issues have shown significant improvement in their quality of life and daily functioning.",
    },
  ],
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Combine all testimonials into a single array
  const allTestimonials = [
    ...testimonials.family,
    ...testimonials.caregivers,
    ...testimonials.healthcare
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === allTestimonials.length - 1 ? 0 : prev + 1));
  }, [allTestimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? allTestimonials.length - 1 : prev - 1));
  }, [allTestimonials.length]);

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6 }
    })
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-gray-50" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            y,
            scale: 1.1,
            opacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gold-900/80 to-gold-900/80" />
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.p
              className="text-sm font-semibold tracking-wider text-gold-200 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              VOICES OF TRUST
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Real Stories, Real Impact
            </motion.h1>
            <motion.p
              className="text-xl text-gold-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover how we're making a difference in people's lives every day
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#testimonial-slider" className="px-6 py-3 bg-white text-gold-700 font-medium rounded-full hover:bg-gold-50 transition-colors">
                View Testimonials
              </a>
              <a href="#contact" className="px-6 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors">
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      {/* Testimonial Slider Section */}
      <section
        id="testimonial-slider"
        className="relative py-20 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background with transparency */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80)',
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from people who have trusted us with their care needs.
            </p>
          </motion.div>

          {/* Slider Container */}
          <div className="relative h-[500px] w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto px-4">
                  <TestimonialCard
                    name={allTestimonials[currentSlide].name}
                    role={allTestimonials[currentSlide].role}
                    message={allTestimonials[currentSlide].message}
                    icon={FaQuoteRight}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gold-700 p-3 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gold-700 p-3 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {allTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentSlide ? 1 : -1);
                    setCurrentSlide(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gold-600 w-8' : 'bg-gold-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.div
        className="my-24  bg-cover bg-center rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden mx-4 sm:mx-6 lg:mx-8"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1505751172876-faee0f1c0d11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)'
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gold-700/80 to-gold-900/80 mix-blend-multiply" />
        <div className="relative z-10">
          <FaQuoteRight className="text-white/20 text-6xl md:text-7xl mx-auto mb-6 transform -rotate-12" />
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
            Ready to Experience Exceptional Care?
          </h3>
          <p className="text-gold-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community of satisfied families and discover the difference quality care can make in your loved one's life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/contact"
              className="px-8 py-3.5 bg-white text-gold-800 font-semibold rounded-full hover:bg-gold-50 transition-all duration-300 flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Started</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
            <motion.a
              href="/services"
              className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Our Services</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;