import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import Rating from "react-rating";
const Review = ({ review }) => {
  const { image, user_name, description, rating } = review;
  const [showFullText, setShowFullText] = useState(false);
  
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";
  };

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative group">
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-emerald-200 group-hover:text-emerald-300 transition-colors duration-300">
        <FiMessageCircle className="w-8 h-8" />
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt={user_name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-100 ring-offset-2"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <AiFillStar className="w-3 h-3 text-white" />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center ring-4 ring-emerald-100 ring-offset-2">
              <span className="text-white font-bold text-lg">
                {getInitials(user_name)}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <AiFillStar className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* User Name */}
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
        {user_name}
      </h3>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-1">
          <Rating
            initialRating={rating}
            emptySymbol={<AiOutlineStar className="text-xl text-gray-300" />}
            fullSymbol={<AiFillStar className="text-xl text-yellow-400" />}
            readonly
          />
          <span className="text-sm text-gray-600 ml-2">({rating})</span>
        </div>
      </div>

      {/* Review Text */}
      <div className="relative">
        <p className="text-gray-600 text-center leading-relaxed">
          "{showFullText ? description : (description.length > 120 ? `${description.slice(0, 120)}...` : description)}"
        </p>
        
        {description.length > 120 && (
          <button 
            onClick={toggleReadMore}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2 transition-colors duration-200 cursor-pointer"
          >
            {showFullText ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default Review;
