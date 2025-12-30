// src/pages/Blog.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaSearch, FaArrowRight, FaComment, FaClock } from 'react-icons/fa';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Caring for Elderly Parents at Home',
      excerpt: 'Learn essential tips for providing the best care for your aging parents in the comfort of their own home.',
      date: 'December 15, 2023',
      author: 'Dr. Sarah Johnson',
      category: 'Caregiving',
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      readTime: '5 min read',
      comments: 8
    },
    {
      id: 2,
      title: 'Understanding Dementia: A Caregiver\'s Guide',
      excerpt: 'A comprehensive guide to understanding dementia and how to provide compassionate care for loved ones.',
      date: 'December 5, 2023',
      author: 'Dr. Michael Chen',
      category: 'Health',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      readTime: '8 min read',
      comments: 12
    },
    {
      id: 3,
      title: 'The Importance of Self-Care for Caregivers',
      excerpt: 'Why taking care of yourself is just as important as taking care of your loved ones.',
      date: 'November 28, 2023',
      author: 'Lisa Thompson',
      category: 'Self-Care',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      readTime: '6 min read',
      comments: 5
    }
  ];

  // Categories for filtering
  const categories = ['All', 'Caregiving', 'Health', 'Self-Care', 'Family Support', 'Senior Living'];

  // Filter posts by search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative h-96 md:h-screen/80 flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/joyous-pensioner-moving-around-kitchen-assisted-by-his-caregiver.jpg"
            alt="Caregiver assisting senior in kitchen"
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
                Our Blog
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              >
                Stay updated with the latest news, tips, and resources for senior care and caregiving.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="relative bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {['All', ...categories.filter(cat => cat !== 'All')].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCategory === category
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Blog Posts Grid */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col h-full hover:border-teal-100"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white bg-teal-500 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <FaCalendarAlt className="mr-1.5 text-teal-400" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <FaUser className="mr-1.5 text-teal-400" />
                          <span>{post.author}</span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
                          <Link to={`/blog/${post.id}`} className="hover:text-teal-600 transition-colors">
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaClock className="mr-1.5 text-teal-400" />
                              {post.readTime}
                            </span>
                            <span className="flex items-center">
                              <FaComment className="mr-1.5 text-teal-400" />
                              {post.comments} Comments
                            </span>
                          </div>
                          <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors group/readmore"
                          >
                            Read more
                            <FaArrowRight className="ml-1.5 text-xs mt-0.5 transition-transform duration-300 group-hover/readmore:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700">No blog posts found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* About Card */}
              <motion.div
                className="bg-gradient-to-br from-teal-500 to-emerald-500 p-6 rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">About Our Blog</h3>
                <p className="text-blue-100 mb-4">Discover expert insights, practical tips, and inspiring stories about senior care and caregiving from our team of professionals.</p>
                <button className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                  Learn More About Us
                </button>
              </motion.div>

              {/* Popular Posts */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Popular Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group flex items-start space-x-3 hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">{post.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">Get the latest articles and resources delivered to your inbox.</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-grow px-4 py-2 text-sm border border-r-0 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
                  />
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 text-sm font-medium rounded-r-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;