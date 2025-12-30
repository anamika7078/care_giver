import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClipboardList,FaArrowRight, FaHeart, FaHandsHelping, FaUserMd, FaHome, FaClock, FaShieldAlt, FaPhoneAlt } from 'react-icons/fa';

// 3D Card Component
const ServiceCard3D = ({ service, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.9, 1]);

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      style={{ y, opacity, scale }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
          <p className="text-gray-600 mb-6 flex-1">{service.description}</p>
          <Link
            to={`/services#${service.id}`}
            className="inline-flex items-center text-gold-700 font-medium group-hover:text-gold-800 transition-colors mt-auto"
          >
            Learn more
            <svg
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const services = [
    {
      id: 1,
      title: "In-Home Care",
      description: "Professional care in the comfort of home with personalized assistance for daily activities and medical needs.",
      image: "/images/joyous-pensioner-moving-around-kitchen-assisted-by-his-caregiver.jpg",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Respite Care",
      description: "Temporary relief for family caregivers, ensuring your loved ones receive quality care while you recharge.",
      image: "/images/nurse-helping-old-woman-sit-bed-nursing-home-after-walking-with-crutches.jpg",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Specialized Care",
      description: "Expert care for conditions like dementia, Alzheimer's, and other specialized medical needs.",
      image: "/images/assisted-living-wheelchair-nurse-helping-old-man-with-disability-entrance-retirement-home-frail-care-healthcare-insurance-with-medicine-professional-senior-resident-apartment.jpg",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Companionship",
      description: "Meaningful social interaction and engagement to enhance quality of life and emotional well-being.",
      image: "/images/affectionate-assistance-discussion-doctor-ethnicity-explaining-females-horizontal-indoors-m.jpg",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-banner.png"
            alt="Compassionate care for your loved ones"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
              >
                Compassionate Care for Your Loved Ones
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Professional in-home care services that bring comfort, dignity, and independence to seniors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/contact"
                  className="bg-gold-600 hover:bg-gold-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '500+', label: 'Happy Clients' },
                { number: '50+', label: 'Expert Caregivers' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gold-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-600/5 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-700 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional care services tailored to your family's unique needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard3D key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-gray-100/50 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gray-200/30 rounded-full"></div>

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              >
                Ready to Get Started with Our <span className="text-indigo-600">Care Services</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto"
              >
                Contact us today to schedule a free consultation and discover how we can help your loved one live their best life at home.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-6"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                >
                  Schedule a Free Consultation
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+18005551234"
                  className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-indigo-600 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center group"
                >
                  <FaPhoneAlt className="mr-3 text-indigo-600 group-hover:text-indigo-700" />
                  <span className="font-medium">(800) 555-1234</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;