import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
const Review = ({ review }) => {
  const { profile, name, review: reviews, rating } = review;
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
        <h2 className="text-left w-full">
          <Rating
            initialRating={rating}
            emptySymbol={<AiOutlineStar className="text-xl" />}
            fullSymbol={
              <AiFillStar className="text-xl" style={{ color: "goldenrod" }} />
            }
            readonly
          ></Rating>
        </h2>
      </div>
    </div>
  );
};

export default Review;
