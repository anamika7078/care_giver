import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaUsers, FaHandHoldingHeart, FaShieldAlt, FaArrowRight, FaInfoCircle, FaClock } from 'react-icons/fa';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'Founder & Medical Director',
            bio: 'Board-certified geriatrician with 15+ years of experience in elderly care. Specializes in developing personalized care plans that enhance quality of life for seniors.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Head of Care Services',
            bio: '10+ years of experience in home healthcare management and patient advocacy. Passionate about ensuring the highest standards of care.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Lead Care Coordinator',
            bio: 'Dedicated to matching families with the perfect care solutions for their needs. Known for her compassionate approach and attention to detail.',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        }
    ];

    const values = [
        {
            icon: <FaHeart className="text-4xl text-red-500 mb-4" />,
            title: 'Compassion',
            description: 'We treat every client as family, with empathy and understanding.'
        },
        {
            icon: <FaShieldAlt className="text-4xl text-blue-600 mb-4" />,
            title: 'Reliability',
            description: 'Consistent, dependable care you can trust, 24/7.'
        },
        {
            icon: <FaUsers className="text-4xl text-green-600 mb-4" />,
            title: 'Expertise',
            description: 'Highly trained professionals with specialized knowledge in elderly care.'
        },
        {
            icon: <FaHandHoldingHeart className="text-4xl text-yellow-500 mb-4" />,
            title: 'Dignity',
            description: 'We respect and honor the independence of every individual in our care.'
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-16">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/aboutus.jpg"
                        alt="Compassionate care background"
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
                                About Our Journey of Care
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                For over a decade, we've been dedicated to providing exceptional in-home care services that prioritize comfort, dignity, and independence for seniors. Our compassionate team of certified caregivers is committed to making a meaningful difference in the lives of those we serve.
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
                                    Schedule a Free Consultation
                                </Link>
                                <Link
                                    to="/services"
                                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg border border-white/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
                                >
                                    <FaInfoCircle className="mr-2" />
                                    Learn About Our Services
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-12 flex flex-wrap justify-center gap-6"
                            >
                                {[
                                    { icon: <FaShieldAlt className="text-2xl" />, text: 'Licensed & Certified' },
                                    { icon: <FaHeart className="text-2xl" />, text: 'Compassionate Care' },
                                    { icon: <FaClock className="text-2xl" />, text: '24/7 Availability' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center text-white/90">
                                        <span className="text-gold-400 mr-2">{item.icon}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Our Story Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl opacity-70 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                            <div className="relative bg-white p-8 rounded-xl shadow-2xl h-full">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Founded in 2015, we started with a simple mission: to provide exceptional care that allows
                                        seniors to age with dignity in the comfort of their homes.
                                    </p>
                                    <p>
                                        Our journey began with a small team of dedicated caregivers and has since grown into a
                                        trusted name in home healthcare, serving hundreds of families across the region.
                                    </p>
                                    <p>
                                        Today, we continue to uphold our core values while expanding our services to meet the
                                        evolving needs of our community.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl opacity-70 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                            <img
                                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Our team in action"
                                className="relative rounded-xl w-full h-full max-h-[400px] object-cover transform group-hover:-translate-y-2 transition-transform duration-300"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-4xl font-bold mb-4 text-white"
                        >
                            Our Core <span className="text-gold-400">Values</span>
                        </motion.h2>
                        <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="text-gold-400 text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-gray-300">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                            Our Experts
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
                            Meet Our <span className="text-indigo-600">Leadership</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our team of dedicated professionals brings together decades of experience in senior care,<br className="hidden lg:block" />
                            ensuring your loved ones receive the highest quality of compassionate support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1 * member.id,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        src={member.image}
                                        alt={member.name}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex space-x-3 justify-center">
                                            {Object.entries(member.social).map(([platform, url]) => (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    className="bg-white/90 text-gray-700 hover:bg-indigo-600 hover:text-white p-2 rounded-full transform hover:-translate-y-1 transition-all duration-300"
                                                    aria-label={platform}
                                                >
                                                    {platform === 'linkedin' && (
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                        </svg>
                                                    )}
                                                    {platform === 'twitter' && (
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                        </svg>
                                                    )}
                                                    {platform === 'email' && (
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                        </svg>
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {member.name}
                                    </h3>
                                    <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-4">
                                        {member.role}
                                    </span>
                                    <p className="text-gray-600 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            to="/about/team"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            View Full Team
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
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
                                Ready to Experience <span className="text-gray-700">Compassionate Care</span>?
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
                                    className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                                >
                                    Get Started
                                    <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <a
                                    href="tel:+18005551234"
                                    className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center group"
                                >
                                    <span className="mr-3">Call Now</span>
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded-md group-hover:bg-gray-200 transition-colors">
                                        (800) 555-1234
                                    </span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
