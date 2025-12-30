import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserMd, FaHome, FaClock, FaHeart, FaClipboardCheck, FaHandHoldingHeart, FaArrowRight } from 'react-icons/fa';

const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Sample services data
    const services = [
        {
            id: 1,
            title: 'In-Home Care',
            description: 'Professional caregivers provide personalized assistance with daily activities in the comfort of your loved one\'s home.',
            category: 'Care Services',
            icon: <FaHome className="text-4xl text-blue-600" />,
            features: ['Personal care', 'Meal preparation', 'Medication reminders', 'Light housekeeping'],
            image: '/images/homecare.jpg'
        },
        {
            id: 2,
            title: 'Respite Care',
            description: 'Temporary relief for family caregivers, giving you time to rest and recharge while we care for your loved one.',
            category: 'Support Services',
            icon: <FaClock className="text-4xl text-green-600" />,
            features: ['Short-term care', 'Flexible scheduling', 'Trained professionals', 'Peace of mind'],
            image: '/images/respite.jpg'
        },
        {
            id: 3,
            title: 'Specialized Care',
            description: 'Expert care for specific conditions like dementia, Alzheimer\'s, or post-surgery recovery.',
            category: 'Medical Services',
            icon: <FaUserMd className="text-4xl text-purple-600" />,
            features: ['Dementia care', 'Post-surgery care', 'Chronic conditions', 'Palliative support'],
            image: '/images/specialize.jpg'
        },
        {
            id: 4,
            title: 'Companionship',
            description: 'Social interaction and meaningful engagement to combat loneliness and improve quality of life.',
            category: 'Companion Services',
            icon: <FaHeart className="text-4xl text-red-500" />,
            features: ['Friendly visits', 'Social activities', 'Hobby engagement', 'Outing assistance'],
            image: '/images/companiship.jpg'
        },
        {
            id: 5,
            title: 'Personal Care',
            description: 'Assistance with personal hygiene, grooming, and other activities of daily living.',
            category: 'Care Services',
            icon: <FaClipboardCheck className="text-4xl text-yellow-600" />,
            features: ['Bathing & dressing', 'Grooming', 'Mobility assistance', 'Toileting'],
            image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            id: 6,
            title: 'Palliative Care',
            description: 'Comfort-focused care for individuals with serious illnesses, managing pain and symptoms.',
            category: 'Medical Services',
            icon: <FaHandHoldingHeart className="text-4xl text-pink-500" />,
            features: ['Pain management', 'Symptom control', 'Emotional support', 'Family guidance'],
            image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
    ];

    // Categories for filtering
    const categories = ['All', 'Care Services', 'Support Services', 'Medical Services', 'Companion Services'];

    // Filter services by search query and active category
    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100  pb-16">
            {/* Hero Section */}
            <div className="relative h-96 md:h-screen/80 flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/services.jpg"
                        alt="Professional care services"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
                            >
                                Our Services
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                            >
                                Comprehensive care solutions tailored to meet your loved one's unique needs with compassion and expertise.
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
                                <a
                                    href="#services"
                                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                                >
                                    <FaClipboardCheck className="mr-2" />
                                    View Services
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 -mt-16 relative z-20" id="services">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
                </div>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Search and Filter */}
                        <div className="mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    className="w-full px-6 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === category
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                                            }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Services List */}
                        <div className="space-y-8">
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service, index) => (
                                    <motion.article
                                        key={service.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                                    >
                                        <div className="md:flex h-full">
                                            <div className="md:flex-shrink-0 md:w-1/3 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                    src={service.image}
                                                    alt={service.title}
                                                    style={{
                                                        minHeight: '100%',
                                                        minWidth: '100%',
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center mb-3">
                                                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                                                        {service.icon}
                                                    </div>
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                                        {service.category}
                                                    </span>
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
                                                    {service.title}
                                                </h2>
                                                <p className="text-gray-600 mb-4">{service.description}</p>

                                                <div className="mb-4">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                                                    <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                        {service.features.map((feature, i) => (
                                                            <li key={i} className="flex items-center">
                                                                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <Link
                                                    to={`/services/${service.id}`}
                                                    className="inline-flex items-center text-blue-600 font-medium group hover:text-blue-800 transition-colors mt-2"
                                                >
                                                    Learn More
                                                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl shadow">
                                    <h3 className="text-xl font-medium text-gray-700">No services found</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        {/* Categories */}
                        <motion.div
                            className="bg-white p-6 rounded-xl shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Service Categories</h3>
                            <ul className="space-y-1">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <motion.button
                                            whileHover={{ x: 4 }}
                                            onClick={() => setActiveCategory(category)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${activeCategory === category
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3"></span>
                                            {category}
                                        </motion.button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Why Choose Us */}
                        <motion.div
                            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Why Choose Our Services?</h3>
                            <ul className="space-y-3">
                                {[
                                    '✓ Certified and experienced caregivers',
                                    '✓ Personalized care plans',
                                    '✓ 24/7 availability',
                                    '✓ Regular quality assessments',
                                    '✓ Compassionate and respectful care'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact CTA */}
                        <motion.div
                            className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h3 className="text-xl font-bold mb-3">Need Help Choosing a Service?</h3>
                            <p className="text-blue-100 mb-4">Our care coordinators are available 24/7 to help you find the right care solution.</p>
                            <div className="space-y-3">
                                <a
                                    href="tel:+18005551234"
                                    className="block w-full text-center bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Call Now: (800) 555-1234
                                </a>
                                <Link
                                    to="/contact"
                                    className="block w-full text-center border-2 border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
