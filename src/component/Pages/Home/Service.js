import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ service }) => {
  const {
    _id,
    image,
    description,
    name,
    price,
    minimum_order,
    product_quantity,
  } = service;
  const navigate = useNavigate();

  return (
    <div className="group relative h-full">
      {/* Card Container */}
      <div className="relative h-full bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-white/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
        
        {/* Product Image Section */}
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-100 to-gray-200">
            <img 
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
              src={image} 
              alt={name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Auto+Part';
              }}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Stock Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-lg">
            {product_quantity > 50 ? "In Stock" : product_quantity > 0 ? "⚡ Limited" : "❌ Out of Stock"}
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg">
            ${price}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
            
            {/* Product Details */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Min: {minimum_order}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>Stock: {product_quantity}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-600 text-sm leading-relaxed">
            {description?.slice(0, 90)}
            {description?.length > 90 && (
              <span className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" title={description}>
                ... read more
              </span>
            )}
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-xs text-gray-500">Quality</div>
              <div className="text-sm font-semibold text-emerald-600">Premium</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Warranty</div>
              <div className="text-sm font-semibold text-blue-600">1 Year</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Shipping</div>
              <div className="text-sm font-semibold text-purple-600">Fast</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate(`/productDetils/${_id}`)}
              className="group/btn relative w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View Details</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              
              {/* Button Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 group-hover/btn:animate-ping bg-white rounded-xl"></div>
            </button>
          </div>
        </div>

        {/* Card Border Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      </div>
    </div>
  );
};

export default Service;
