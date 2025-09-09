"use client";

import { useState, useEffect } from 'react';
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube, 
  FaHome,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaHeart
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";


export default function HelloFormFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [currentYear] = useState(new Date().getFullYear());

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social links with colors
  const socialLinks = [
    { icon: FaFacebookF, name: "Facebook", color: "#1877F2", url: "https://www.facebook.com/oneisok/" },
    { icon: FaXTwitter, name: "Twitter", color: "#1DA1F2", url: "https://x.com/Oneisokindia" },
    { icon: FaLinkedinIn, name: "LinkedIn", color: "#0A66C2", url: "https://www.linkedin.com/company/oneisok/" },
    { icon: FaYoutube, name: "YouTube", color: "#FF0000", url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#0e1c7b] to-[#1a2980] text-white relative overflow-hidden">
      {/* Background subtle animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white animate-pulse"></div>
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-6 left-1/3 w-12 h-12 rounded-full bg-white animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Main footer content */}
      <div className="px-6 py-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
              Oneisok
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
            <p className="text-gray-200 text-base max-w-lg mx-auto">
              Transforming ideas into digital reality with innovative solutions.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">CONTACT INFO</h3>
              <div className="space-y-3 text-sm">
                {/* Address */}
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    {/* Increased size from text-sm → text-base */}
                    <FaHome className="text-white text-base group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                    Corp Office - 141/1B LENIN SARANI KOLKATA, KOLKATA-700013
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <FaEnvelope className="text-white text-base group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <a 
                    href="mailto:oneisokindia@gmail.com" 
                    className="text-gray-200 hover:text-yellow-300 transition-colors duration-300"
                  >
                    oneisokindia@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white transition-all duration-300">
                    <FaPhone className="text-white text-base group-hover:text-[#0e1c7b] transition-colors duration-300" />
                  </div>
                  <a 
                    href="tel:+91 93312 22555" 
                    className="text-gray-200 hover:text-yellow-300 transition-colors duration-300"
                  >
                    +91 93312 22555
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">SOCIAL MEDIA</h3>
              <p className="text-gray-200 text-sm mb-4">Connect with us!</p>
              
              <div className="grid grid-cols-3 gap-2">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {/* Main icon wrapper */}
                      <div className={`w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 transform ${
                        hoveredSocial === index ? "scale-110" : "hover:scale-105"
                      }`}>
                        <IconComponent 
                          className={`text-lg transition-all duration-300 ${
                            hoveredSocial === index ? "text-white" : "text-gray-200"
                          }`} 
                        />
                      </div>
                      
                      {/* Overlay background on hover */}
                      <div 
                        className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 ${
                          hoveredSocial === index ? "opacity-100" : ""
                        }`}
                        style={{ 
                          backgroundColor: hoveredSocial === index ? social.color : "transparent" 
                        }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
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

      {/* Bottom Section */}
      <div className="bg-black/30 border-t border-white/10 px-6 py-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm">
            <div className="flex items-center space-x-1 text-gray-200">
              <span>© {currentYear} Oneisok. Made with</span>
              <FaHeart className="text-red-500 animate-pulse text-xs" />
              <span>All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <a href="https://oneisok.co/" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="https://oneisok.co/" className="text-gray-200 hover:text-yellow-300 transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="https://oneisok.co/" className="text-white hover:text-yellow-300 transition-colors duration-300 hover:underline font-semibold">
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
          showScrollTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-0"
        } hover:scale-110`}
      >
        <FaArrowUp className="mx-auto text-sm" />
      </button>
    </footer>
  );
}
