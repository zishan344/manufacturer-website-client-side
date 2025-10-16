import React from "react";
import { Link } from "react-router-dom";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiArrowRight,
  FiHeart
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/" },
    { name: "Our Products", path: "/allProduct" },
    { name: "Contact", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  const services = [
    "Auto Parts Manufacturing",
    "Quality Assurance",
    "Custom Solutions",
    "Technical Support",
    "Warranty Service"
  ];

  const socialLinks = [
    { icon: FiFacebook, url: "#", color: "hover:text-blue-600" },
    { icon: FiTwitter, url: "#", color: "hover:text-sky-500" },
    { icon: FiInstagram, url: "#", color: "hover:text-pink-600" },
    { icon: FiLinkedin, url: "#", color: "hover:text-blue-700" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.3),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-30"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Autovantis
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your trusted partner in automotive excellence. We manufacture premium auto parts 
              with cutting-edge technology and uncompromising quality standards.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <FiMapPin className="text-emerald-400" />
                </div>
                <span>123 Auto Street, Industrial Zone, City 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <FiPhone className="text-emerald-400" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <FiMail className="text-emerald-400" />
                </div>
                <span>info@autovantis.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <FiArrowRight className="text-emerald-400 transform group-hover:translate-x-1 transition-transform duration-200" size={16} />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Our Services</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Autovantis. Made with</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span>All rights reserved.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-white/20`}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </footer>
  );
};

export default Footer;
