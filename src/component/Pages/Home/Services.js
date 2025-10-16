import React from "react";
import { useNavigate } from "react-router-dom";
import Service from "./Service";
import { useProducts } from "../../hooks/useProducts";

const Services = () => {
  const [products] = useProducts();
  const navigate = useNavigate();

  return (
    <div className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-4">
            🚗 Premium Collection
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-800">Featured</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"> Auto Parts</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium selection of high-performance automotive components, 
            engineered for excellence and built to last.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.slice(Math.max(products.length - 3, 0)).map((product, index) => (
            <div key={index} className="group relative">
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Product Card */}
              <div className="relative bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                <Service service={product} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => navigate("/allProduct")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Explore All Products</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-sm">Over</span>
              <span className="text-2xl font-bold text-blue-600">1000+</span>
              <span className="text-sm">premium products available</span>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚀", title: "Fast Delivery", desc: "Same day shipping" },
            { icon: "🔧", title: "Expert Support", desc: "24/7 assistance" },
            { icon: "💎", title: "Premium Quality", desc: "OEM standards" },
            { icon: "🛡️", title: "Warranty", desc: "1-year guarantee" }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
