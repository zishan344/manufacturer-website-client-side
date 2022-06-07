import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating";
const Review = ({ review }) => {
  const { image, user_name, description, rating } = review;
  console.log(review);
  const fullName = review?.user_name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="card max-w-lg bg-base-100 shadow-xl mx-auto">
      {review?.image ? (
        <div className="avatar flex justify-center mt-4">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={image} alt="profile" className="rounded-xl" />
          </div>
        </div>
      ) : (
        <div className="avatar flex justify-center mt-4">
          <div
            style={{ display: "flex" }}
            className="w-24 rounded-full ring ring-primary bg-primary ring-offset-base-100 ring-offset-2 justify-center items-center"
          >
            <span className="rounded-xl text-3xl font-bold text-secondary">
              {fullName}
            </span>
          </div>
        </div>
      )}

      <div className="card-body items-center text-center">
        <h2 className="card-title">{user_name}</h2>
        <p>
          {description.slice(0, 100)}
          {description.length > 100 && (
            <span title={`${description}`}>...</span>
          )}
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
