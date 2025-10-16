import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      
      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold">
              Advanced Auto Technology
            </div>
            
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Premium</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 animate-pulse">
                  Auto Parts
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                Discover cutting-edge automotive components engineered for 
                <span className="text-blue-400 font-semibold"> performance</span>, 
                <span className="text-emerald-400 font-semibold"> reliability</span>, and 
                <span className="text-purple-400 font-semibold"> innovation</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10"><Link to="/allProduct">Explore Products</Link></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-gray-400 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-gray-400 text-sm">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99%</div>
                <div className="text-gray-400 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://htmldemo.net/lukas/lukas/assets/img/slider/slider-2-2.png"
                  alt="Premium Auto Part"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Feature Cards */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  ⚡ High Performance
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  Premium Quality
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-60 animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
