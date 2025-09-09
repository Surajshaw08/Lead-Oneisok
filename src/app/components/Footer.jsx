"use client";

import { useState, useEffect } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube, 
  FaVimeoV, 
  FaPinterestP,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaHeart
} from 'react-icons/fa';

export default function HelloFormFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [currentYear] = useState(new Date().getFullYear());

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaFacebookF, name: 'Facebook', color: '#1877F2' },
    { icon: FaTwitter, name: 'Twitter', color: '#1DA1F2' },
    { icon: FaLinkedinIn, name: 'LinkedIn', color: '#0A66C2' },
    { icon: FaYoutube, name: 'YouTube', color: '#FF0000' },
    { icon: FaVimeoV, name: 'Vimeo', color: '#1AB7EA' },
    { icon: FaPinterestP, name: 'Pinterest', color: '#BD081C' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0e1c7b] to-[#1a2980] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white animate-pulse"></div>
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-1/3 w-12 h-12 rounded-full bg-white animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Compact Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
              Oneisok
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
            <p className="text-gray-200 text-base max-w-lg mx-auto">
              Transforming ideas into digital reality with innovative solutions.
            </p>
          </div>

          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Contact Info - Condensed */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">CONTACT INFO</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <FaHome className="text-white text-sm group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    70 Trent Rd, Luton LU3 1TA, UK
                  </span>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <FaEnvelope className="text-white text-sm group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <a 
                    href="mailto:info@oneisok.com" 
                    className="text-gray-200 hover:text-yellow-300 transition-colors duration-300"
                  >
                    info@oneisok.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <FaPhone className="text-white text-sm group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <a 
                    href="tel:+0000000000" 
                    className="text-gray-200 hover:text-yellow-300 transition-colors duration-300"
                  >
                    +000 0000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media - Compact */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">SOCIAL MEDIA</h3>
              <p className="text-gray-200 text-sm mb-4">Connect with us!</p>
              
              <div className="grid grid-cols-3 gap-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href="#" 
                      className="group relative"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <div className={`w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 transform ${
                        hoveredSocial === index ? 'scale-110' : 'hover:scale-105'
                      }`}>
                        <IconComponent 
                          className={`text-lg transition-all duration-300 ${
                            hoveredSocial === index ? 'text-white' : 'text-gray-200'
                          }`} 
                        />
                      </div>
                      
                      <div 
                        className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 ${
                          hoveredSocial === index ? 'opacity-100' : ''
                        }`}
                        style={{ 
                          backgroundColor: hoveredSocial === index ? social.color : 'transparent' 
                        }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter - Compact */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">STAY UPDATED</h3>
              <p className="text-gray-200 text-sm mb-4">
                Get our latest updates and insights.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#0e1c7b] text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Bottom Section */}
      <div className="bg-black/30 border-t border-white/10 px-6 py-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm">
            <div className="flex items-center space-x-1 text-gray-200">
              <span>© {currentYear} Oneisok. Made with</span>
              <FaHeart className="text-red-500 animate-pulse text-xs" />
              <span>All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <a href="#" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors duration-300 hover:underline font-semibold">
                Buy Oneisok Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-[#0e1c7b] to-blue-600 hover:from-yellow-400 hover:to-yellow-500 text-white rounded-full shadow-lg transition-all duration-300 transform z-50 ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-0'
        } hover:scale-110`}
      >
        <FaArrowUp className="mx-auto text-sm" />
      </button>
    </footer>
  );
}