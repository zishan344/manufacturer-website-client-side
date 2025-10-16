import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiStar, FiUsers, FiMessageCircle } from "react-icons/fi";
import Review from "./Review";

const Reviews = React.memo(() => {
  const [reviews, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check cache first
    const cachedReviews = localStorage.getItem('autovantis_reviews');
    const cacheTime = localStorage.getItem('autovantis_reviews_time');
    const now = new Date().getTime();
    
    // Use cache if it's less than 10 minutes old
    if (cachedReviews && cacheTime && (now - parseInt(cacheTime)) < 600000) {
      setReview(JSON.parse(cachedReviews));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch("https://autovantis.onrender.com/reviews", {
      signal: controller.signal
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
        // Cache the data
        localStorage.setItem('autovantis_reviews', JSON.stringify(data));
        localStorage.setItem('autovantis_reviews_time', now.toString());
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error('Reviews fetch error:', err);
        setLoading(false);
        // Use cached data as fallback if available
        if (cachedReviews) {
          setReview(JSON.parse(cachedReviews));
        }
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  // Memoize expensive calculations
  const { averageRating, formattedAverage } = React.useMemo(() => {
    const totalRating = reviews.reduce((sum, review) => {
      const rating = Number(review.rating) || 0;
      return sum + rating;
    }, 0);
    const total = reviews.length;
    const avg = total > 0 ? totalRating / total : 0;
    return {
      averageRating: avg,
      formattedAverage: avg.toFixed(1)
    };
  }, [reviews]);

  // Get latest 3 reviews
  const latestReviews = React.useMemo(() => 
    reviews.slice(Math.max(reviews.length - 3, 0)), 
    [reviews]
  );

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative">
      {/* Reduced background elements for better performance */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-500/8 rounded-full blur-lg"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-500/8 rounded-full blur-lg"></div>
      
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
              <span className="text-lg font-semibold text-gray-900">{formattedAverage}</span>
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
          {latestReviews.map((review, index) => (
            <Review key={review._id || index} review={review} />
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
});

export default Reviews;
