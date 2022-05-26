import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("https://desolate-citadel-69075.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  const navigate = useNavigate();

  return (
    <div className="my-12 container mx-auto">
      <div className="text-center">
        <h2 className="text-[#86B6F4] text-xl font-bold my-12 inline-block bg-[#E7F1FD] px-2 py-1 rounded-full">
          Testimonial Review
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.slice(Math.max(reviews.length - 3, 0)).map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
      <div className="text-center my-10">
        <button
          onClick={() => navigate("/allReviews")}
          className="btn btn-outline btn-secondary"
        >
          See More Reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
