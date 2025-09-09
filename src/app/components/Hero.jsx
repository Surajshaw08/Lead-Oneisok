"use client";

import { useState, useEffect } from 'react';

export default function HelloForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    budget: '',
    priority: 'Low',
    launchDate: '',
    comments: '',
    consent: false
  });

  const [isRobot, setIsRobot] = useState(true);
  const [focusedField, setFocusedField] = useState('');
  const [completedFields, setCompletedFields] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create floating particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Track completed fields
    if (value || checked) {
      setCompletedFields(prev => new Set([...prev, name]));
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRobot || !formData.consent) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        alert('Form sent successfully!');
      } else {
        alert('Error sending form: ' + result.error);
      }
    } catch (err) {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldProgress = () => {
    const totalFields = 9; // Required fields
    return (completedFields.size / totalFields) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#0e1c7b] opacity-10 pointer-events-none animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${10 + particle.id}s ease-in-out infinite alternate`
          }}
        />
      ))}

      <div className="w-full max-w-2xl relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="flex items-center justify-center mb-2 group">
            <a href="https://oneisok.co/" target="_blank" rel="noopener noreferrer" className="mr-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <img
                src="/oneisok.png"
                alt="Oneisok Logo"
                className="h-50 w-50 overflow-hidden object-contain transition-all duration-300"
                style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(99%) saturate(747%) hue-rotate(203deg) brightness(92%) contrast(101%)' }}
              />
            </a>
            {/* <a href="https://oneisok.co/" target="_blank" rel="noopener noreferrer" className="mr-1 flex-shrink-0">
              <h1 className="text-4xl font-bold text-black ml-1 transition-colors duration-300 hover:text-[#0e1c7b]">
                <span className="text-[#0e1c7b] bg-gradient-to-r from-[#0e1c7b] to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Oneisok
                </span>
              </h1>
            </a> */}
          </div>
          
          {/* Animated Progress Bar */}
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#0e1c7b] to-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${getFieldProgress()}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mb-4">Form Progress: {Math.round(getFieldProgress())}%</p>
          
          <p className="text-black text-lg leading-relaxed max-w-md mx-auto animate-fade-in opacity-80 hover:opacity-100 transition-opacity duration-300">
            Thank you for connect with Oneisok.
          </p>
        </div>

        {/* Enhanced Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:shadow-3xl transition-all duration-500 animate-slide-up border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black border-b-2 border-gray-200 pb-3">
              QUOTE <span className="text-[#0e1c7b] animate-pulse">REQUEST</span>
            </h2>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${completedFields.size > i * 3 ? 'bg-[#0e1c7b]' : 'bg-gray-300'} transition-colors duration-300`} />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Name Field */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                focusedField === 'name' || formData.name ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Your Name* {completedFields.has('name') && <span className="ml-1">✓</span>}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                placeholder="Your Name*"
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black placeholder-gray-500 transition-all duration-300 transform ${
                  focusedField === 'name' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('name') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('name') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Email Field */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                focusedField === 'email' || formData.email ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Your Email* {completedFields.has('email') && <span className="ml-1">✓</span>}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="Your Email*"
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black placeholder-gray-500 transition-all duration-300 transform ${
                  focusedField === 'email' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('email') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('email') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Phone Field */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                focusedField === 'phone' || formData.phone ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Contact Phone* {completedFields.has('phone') && <span className="ml-1">✓</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField('')}
                placeholder="Contact Phone*"
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black placeholder-gray-500 transition-all duration-300 transform ${
                  focusedField === 'phone' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('phone') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('phone') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Address Field */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                focusedField === 'address' || formData.address ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Your Address* {completedFields.has('address') && <span className="ml-1">✓</span>}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('address')}
                onBlur={() => setFocusedField('')}
                placeholder="Your Address*"
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black placeholder-gray-500 transition-all duration-300 transform ${
                  focusedField === 'address' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('address') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('address') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Service Selection */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 z-10 ${
                focusedField === 'service' || formData.service ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Select Service* {completedFields.has('service') && <span className="ml-1">✓</span>}
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('service')}
                onBlur={() => setFocusedField('')}
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black appearance-none transition-all duration-300 transform cursor-pointer ${
                  focusedField === 'service' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('service') ? 'border-green-400' : ''}`}
              >
                <option value="">--- Select a Service* ---</option>
                <option value="web-development">🌐 Web Development</option>
                <option value="mobile-app">📱 Mobile App Development</option>
                <option value="ui-ux-design">🎨 UI/UX Design</option>
                <option value="digital-marketing">📈 Digital Marketing</option>
                <option value="seo">🔍 SEO Services</option>
              </select>
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('service') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Budget Selection */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 z-10 ${
                focusedField === 'budget' || formData.budget ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Select Budget* {completedFields.has('budget') && <span className="ml-1">✓</span>}
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('budget')}
                onBlur={() => setFocusedField('')}
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black appearance-none transition-all duration-300 transform cursor-pointer ${
                  focusedField === 'budget' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('budget') ? 'border-green-400' : ''}`}
              >
                <option value="">--- Select Project Budget* ---</option>
                <option value="under-5k">💰 Under ₹5,000</option>
                <option value="5k-10k">💰💰 ₹5,000 - ₹10,000</option>
                <option value="10k-25k">💰💰💰 ₹10,000 - ₹25,000</option>
                <option value="25k-50k">💎 ₹25,000 - ₹50,000</option>
                <option value="over-50k">💎💎 Over ₹50,000</option>
              </select>
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('budget') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Priority */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
              <label className="block text-black font-medium flex items-center flex-wrap">
                Priority*: 
                <span className="ml-2 text-xs bg-[#0e1c7b] text-white px-2 py-1 rounded-full">
                  {formData.priority}
                </span>
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
                {['Low', 'Medium', 'Urgent'].map((priority) => (
                  <label key={priority} className={`flex items-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    formData.priority === priority ? 'text-[#0e1c7b] font-semibold' : ''
                  }`}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#0e1c7b] border-[#0e1c7b] focus:ring-[#0e1c7b] transition-all duration-300"
                    />
                    <span className={`ml-2 text-sm ${formData.priority === priority ? 'text-[#0e1c7b]' : 'text-black'} transition-colors duration-300`}>
                      {priority} {priority === 'Urgent' ? '⚡' : priority === 'Medium' ? '⏰' : '📅'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Enhanced Launch Date */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 z-10 ${
                focusedField === 'launchDate' || formData.launchDate ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Estimated Launch Date* {completedFields.has('launchDate') && <span className="ml-1">✓</span>}
              </label>
              <input
                type="date"
                name="launchDate"
                value={formData.launchDate}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('launchDate')}
                onBlur={() => setFocusedField('')}
                required
                className={`w-full px-4 py-3 border-2 rounded-full focus:outline-none bg-white text-black transition-all duration-300 transform ${
                  focusedField === 'launchDate' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('launchDate') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${completedFields.has('launchDate') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced Comments */}
            <div className="relative group">
              <label className={`absolute -top-2 left-4 px-2 py-1 rounded text-xs font-medium transition-all duration-300 z-10 ${
                focusedField === 'comments' || formData.comments ? 'bg-[#0e1c7b] text-white transform -translate-y-1' : 'bg-gray-400 text-white'
              }`}>
                Your Comments* {completedFields.has('comments') && <span className="ml-1">✓</span>}
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('comments')}
                onBlur={() => setFocusedField('')}
                placeholder="Provide brief description about your service/project for better assistance."
                required
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-2xl focus:outline-none bg-white text-black placeholder-gray-500 resize-none transition-all duration-300 transform ${
                  focusedField === 'comments' ? 'border-[#0e1c7b] scale-105 shadow-lg' : 'border-black hover:border-black'
                } ${completedFields.has('comments') ? 'border-green-400' : ''}`}
              />
              <div className={`absolute right-4 top-4 transition-all duration-300 ${completedFields.has('comments') ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>

            {/* Enhanced reCAPTCHA */}
            <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 transform hover:scale-102 ${
              !isRobot ? 'bg-green-50 border-green-200' : 'bg-gray-100 border-gray-300'
            }`}>
              <input
                type="checkbox"
                checked={!isRobot}
                onChange={(e) => setIsRobot(!e.target.checked)}
                className="w-6 h-6 text-[#0e1c7b] border-2 border-[#0e1c7b] rounded focus:ring-[#0e1c7b] transition-all duration-300 transform hover:scale-110"
              />
              <span className={`transition-colors duration-300 ${!isRobot ? 'text-green-700 font-semibold' : 'text-black'}`}>
                I'm not a robot {!isRobot && '✓'}
              </span>
              <div className="ml-auto">
                <div className={`w-30 h-12 rounded flex items-center justify-center transition-all duration-300 ${
                  !isRobot ? 'bg-green-500' : 'bg-[#0e1c7b]'
                }`}>
                  <div className="text-white text-xs font-bold">
                    {!isRobot ? '✓' : 'reCAPTCHA'}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Consent */}
            <div className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
              formData.consent ? 'bg-green-50' : 'bg-gray-50'
            }`}>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                required
                className="w-5 h-5 text-[#0e1c7b] border border-[#0e1c7b] rounded focus:ring-[#0e1c7b] mt-0.5 transition-all duration-300 transform hover:scale-110"
              />
              <p className={`text-sm transition-colors duration-300 ${formData.consent ? 'text-green-700' : 'text-black'}`}>
                I consent to Collect my data according to the{' '}
                <a href="#" className="text-[#0e1c7b] underline hover:text-blue-600 transition-colors duration-300">
                  Terms & Conditions
                </a>
                {formData.consent && <span className="ml-2 text-green-600">✓</span>}
              </p>
            </div>

            {/* Enhanced Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isRobot || !formData.consent || isSubmitting}
                className={`px-12 py-3 rounded-full font-bold text-white transition-all duration-500 transform ${
                  isRobot || !formData.consent || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed scale-95'
                    : 'bg-gradient-to-r from-[#0e1c7b] to-blue-600 hover:from-black hover:to-gray-800 scale-100 hover:scale-110 shadow-lg hover:shadow-2xl'
                } relative overflow-hidden`}
              >
                <span className={`transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  SEND
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {!isSubmitting && !isRobot && formData.consent && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
              
              {/* Progress indicator */}
              <div className="mt-4 text-sm text-gray-600">
                {getFieldProgress() === 100 ? (
                  <span className="text-green-600 font-semibold flex items-center justify-center">
                    <span className="mr-2">🎉</span> All fields completed!
                  </span>
                ) : (
                  <span>Complete all fields to enable submission</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease;
        }
      `}</style>
    </div>
  );
}