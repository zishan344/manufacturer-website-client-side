import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiStar, FiUsers, FiMessageCircle } from "react-icons/fi";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("https://autovantis.onrender.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  const navigate = useNavigate();

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiMessageCircle className="w-4 h-4" />
            <span>Customer Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our 
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Customers </span>
            Say
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real feedback from satisfied customers who trust our automotive solutions
          </p>

          {/* Statistics */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar 
                    key={star} 
                    className={`w-5 h-5 ${
                      star <= Math.floor(averageRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
              <span className="text-gray-600">average rating</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <FiUsers className="w-5 h-5" />
              <span>{reviews.length}+ satisfied customers</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(Math.max(reviews.length - 3, 0)).map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/allReviews")}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All Reviews</span>
            <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
