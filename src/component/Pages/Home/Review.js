import React from "react";

const Review = ({ review }) => {
  const { profile, name, review: reviews } = review;
  return (
    <div className="card max-w-lg bg-base-100 shadow-xl ">
      <div class="avatar flex justify-center mt-4">
        <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={profile} alt="Shoes" className="rounded-xl" />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>
          {reviews.slice(0, 100)}
          {reviews.length > 100 && <span title={`${reviews}`}>...</span>}
        </p>
        <h2 className="text-left w-full font-bold  ">
          Rating: <span className="text-orange-300"> 4.5</span>
        </h2>
      </div>
    </div>
  );
};

export default Review;
