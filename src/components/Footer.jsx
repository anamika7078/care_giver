import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Services', href: '/services' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety Center', href: '/safety' },
        { name: 'Community Guidelines', href: '/guidelines' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'For Caregivers',
      links: [
        { name: 'Become a Caregiver', href: '/become-caregiver' },
        { name: 'Caregiver Resources', href: '/caregiver-resources' },
        { name: 'Caregiver Login', href: '/login?role=caregiver' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FiFacebook className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <FiTwitter className="h-5 w-5" />, href: '#' },
    { name: 'Instagram', icon: <FiInstagram className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <FiLinkedin className="h-5 w-5" />, href: '#' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              {/* <img src="/logo.svg" alt="Family Caregive Logo" className="h-8 w-auto" /> */}
              <span className="ml-2 text-xl font-bold text-white">Family Caregive</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Connecting families with compassionate and experienced caregivers. Quality care for your loved ones, when they need it most.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <FiMapPin className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-neutral-400">123 Care Street, Suite 100<br />San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <FiMail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a href="mailto:hello@carelee.com" className="text-neutral-400 hover:text-white transition-colors">
                  hello@carelee.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                <a href="tel:+18005551234" className="text-neutral-400 hover:text-white transition-colors">
                  (800) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm text-center md:text-left">
            © {currentYear} Family Caregive. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-neutral-500 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

