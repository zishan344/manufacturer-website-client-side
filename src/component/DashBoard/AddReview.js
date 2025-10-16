import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { 
  FiStar, 
  FiUser, 
  FiMessageSquare, 
  FiSend,
  FiCheck,
  FiImage
} from "react-icons/fi";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();

  const rating = watch("rating") || selectedRating;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { description, user_name, rating } = data;
      const reviewData = {
        description,
        user_name,
        rating: Number(rating),
        image: user?.photoURL,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("https://autovantis.onrender.com/review", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success("Review submitted successfully!");
        reset();
        setSelectedRating(0);
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starValue) => {
    setSelectedRating(starValue);
    setValue("rating", starValue);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredStar || rating);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          className={`text-2xl transition-all duration-200 hover:scale-110 ${
            isActive ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <FiStar className={isActive ? 'fill-current' : ''} />
        </button>
      );
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-4">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
            <FiStar className="w-4 h-4" />
            <span>Share Experience</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Add Review</h1>
          <p className="text-gray-600 text-sm">Help others with your feedback</p>
        </div>

        {/* Fluid Review Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            
            {/* Left Side - User Info & Rating (Compact) */}
            <div className="lg:col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6">
              {/* User Profile - Compact */}
              <div className="flex lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 mb-6">
                <div className="relative flex-shrink-0">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 lg:text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{user?.displayName}</h3>
                  <p className="text-xs text-gray-600">Verified Customer</p>
                </div>
              </div>

              {/* Rating Section - Compact */}
              <div className="space-y-3">
                <label className="flex items-center justify-center lg:justify-start space-x-2 text-sm font-semibold text-gray-700">
                  <FiStar className="w-4 h-4 text-emerald-600" />
                  <span>Rate Experience</span>
                </label>
                <div className="flex flex-col items-center lg:items-start space-y-2">
                  <div className="flex space-x-1">
                    {renderStars()}
                  </div>
                  <span className="text-xs text-gray-600 text-center lg:text-left">
                    {rating ? `${rating}/5 stars` : 'Click to rate'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-red-600 text-xs font-medium text-center lg:text-left">{errors.rating.message}</p>
                )}
              </div>

              {/* Guidelines - Ultra Compact */}
              <div className="mt-6 pt-4 border-t border-emerald-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Quick Tips:</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Be honest & specific</li>
                  <li>• Focus on quality & service</li>
                  <li>• Keep it respectful</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Review Form (Fluid) */}
            <div className="lg:col-span-2 p-4 sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Hidden Fields */}
                <input {...register("user_name")} type="hidden" value={user?.displayName || ''} />
                <input {...register("rating", {
                  required: "Please provide a rating",
                  min: { value: 1, message: "Rating must be at least 1" },
                  max: { value: 5, message: "Rating cannot exceed 5" }
                })} type="hidden" value={rating} />

                {/* Review Description - Fluid */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <FiMessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Share Your Feedback</span>
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Please write your review",
                      minLength: { value: 10, message: "Review must be at least 10 characters" },
                      maxLength: { value: 500, message: "Review cannot exceed 500 characters" }
                    })}
                    rows="6"
                    placeholder="Tell us about your experience with our product or service. What did you like? What could be improved?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/70 backdrop-blur-sm resize-none text-sm transition-colors"
                  />
                  <div className="flex justify-between items-center">
                    {errors.description ? (
                      <p className="text-red-600 text-xs font-medium">{errors.description.message}</p>
                    ) : (
                      <div></div>
                    )}
                    <span className="text-xs text-gray-500">
                      {watch("description")?.length || 0}/500
                    </span>
                  </div>
                </div>

                {/* Submit Button - Compact */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !rating}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-sm">Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FiSend className="w-4 h-4" />
                        <span className="text-sm">Submit Review</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
