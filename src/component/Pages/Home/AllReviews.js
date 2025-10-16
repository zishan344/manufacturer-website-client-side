import React, { useEffect, useState, useMemo } from "react";
import { 
  FiFilter, 
  FiStar, 
  FiUsers, 
  FiMessageCircle,
  FiTrendingUp,
  FiGrid,
  FiList
} from "react-icons/fi";
import Loading from "../../Shared/Loading";
import Review from "./Review";

const AllReviews = () => {
  const [reviews, setReview] = useState([]);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://autovantis.onrender.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(review => {
      const reviewRating = Number(review.rating) || 0;
      const matchesRating = filterRating === "all" || 
                            (filterRating === "5" && reviewRating === 5) ||
                            (filterRating === "4" && reviewRating >= 4) ||
                            (filterRating === "3" && reviewRating >= 3);
      
      return matchesRating;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.user_name.localeCompare(b.user_name);
        default: // newest
          return new Date(b.date || 0) - new Date(a.date || 0);
      }
    });

    return filtered;
  }, [reviews, filterRating, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    if (reviews.length === 0) return { total: 0, average: "0.0", distribution: {}, satisfaction: 0 };
    
    const total = reviews.length;
    
    // Calculate average rating properly
    const totalRating = reviews.reduce((sum, review) => {
      const rating = Number(review.rating) || 0;
      return sum + rating;
    }, 0);
    
    const averageRating = total > 0 ? totalRating / total : 0;
    const average = averageRating.toFixed(1);
    
    // Calculate distribution
    const distribution = reviews.reduce((acc, review) => {
      const rating = Number(review.rating) || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
    
    // Calculate satisfaction percentage properly
    const satisfaction = Math.round((averageRating / 5) * 100);

    return { total, average, distribution, satisfaction };
  }, [reviews]);

  if (isLoading) {
    return <Loading />;
  }

  if (reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FiMessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Reviews Yet</h2>
          <p className="text-gray-600">Be the first to share your experience with us!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiMessageCircle className="w-4 h-4" />
            <span>All Customer Reviews</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer 
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Testimonials</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read what our satisfied customers have to say about their experience with our products and services
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiStar className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.average}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">5-Star Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.distribution[5] || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiMessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{stats.satisfaction}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Rating Filter */}
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-400 w-5 h-5" />
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rating</option>
                <option value="name">By Name</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-white text-emerald-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-white text-emerald-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
            </p>
          </div>
        </div>

        {/* Reviews Grid/List */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
        }`}>
          {filteredAndSortedReviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-12">
            <FiFilter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Found</h3>
            <p className="text-gray-600">
              Try adjusting your filter criteria to find more reviews.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
