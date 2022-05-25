import React, { useEffect, useState } from "react";
import Review from "./Review";

const AllReviews = () => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
      });
  }, []);
  return (
    <div className="my-12 container mx-auto">
      <div className="text-center">
        <h2 className="text-[#86B6F4] text-xl font-bold my-12 inline-block bg-primary px-2 py-1 rounded-full">
          Testimonial Reviews
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
