import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiMail,
  FiDollarSign,
  FiBookOpen,
  FiLogIn,
  FiMessageSquare,
  FiUserPlus
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const location = useLocation();

  // Check if current path is a dashboard route
  useEffect(() => {
    const dashboardPaths = ['/dashboard', '/admin', '/caregiver', '/family'];
    const isDashboardRoute = dashboardPaths.some(path =>
      location.pathname.startsWith(path)
    );
    // Hide navbar on dashboard routes, show on public routes
    setIsDashboard(isDashboardRoute);
  }, [location]);

  // Hide the navbar on dashboard pages
  if (isDashboard) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome className="mr-2" /> },
    { name: "About", href: "/about", icon: <FiInfo className="mr-2" /> },
    {
      name: "Services",
      href: "/services",
      icon: <FiBriefcase className="mr-2" />,
    },
    { name: "Blog", href: "/blog", icon: <FiBookOpen className="mr-2" /> },
    {
      name: "Testinomial",
      href: "/testimonials",
      icon: <FiMessageSquare className="mr-2" />,
    },
    {
      name: "Price And Plans",
      href: "/pricing",
      icon: <FiDollarSign className="mr-2" />,
    },
    { name: "Contact", href: "/contact", icon: <FiMail className="mr-2" /> },
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-gradient-to-r from-gold-400 to-gold-600 p-1.5 rounded-lg">
              <img
                src="/logo.jpg"
                alt="Parents First"
                className="h-8 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center text-sm font-medium hover:text-gold-600 transition-colors px-2 py-1 rounded ${isActive
                    ? "text-gold-600 font-semibold bg-gold-50"
                    : "text-charcoal-600 hover:text-gold-600"
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                <span className="ml-1.5">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-charcoal-700 hover:bg-cream-100 transition-colors flex items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <FiLogIn className="mr-2" /> Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-md bg-gold-500 text-white hover:bg-gold-600 transition-colors flex items-center"
            >
              <FiUserPlus className="mr-2" /> Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal-500 hover:text-gold-600 hover:bg-cream-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="flex items-center px-3 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-50 rounded-md hover:text-gold-600"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-cream-200">
              <Link
                to="/login"
                className="flex items-center px-3 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-50 rounded-md hover:text-gold-600"
                onClick={() => setIsOpen(false)}
              >
                <FiLogIn className="mr-2" /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-3 py-3 text-base font-medium text-charcoal-700 hover:bg-cream-50 rounded-md hover:text-gold-600"
                onClick={() => setIsOpen(false)}
              >
                <FiUserPlus className="mr-2" /> Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;