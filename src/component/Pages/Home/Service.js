import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ service }) => {
  const {
    _id,
    image,
    description,
    name,
    price,
    minimum_order,
    product_quantity,
  } = service;
  const navigate = useNavigate();
  return (
    <div className="card card-compact max-w-lg bg-base-100 px-4 mx-auto shadow-xl">
      <figure>
        <img src={image} alt="car parts" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="tex-sm font-bold">Price: ${price}</p>
        <p>Available products: {product_quantity}</p>
        <p>minimum order: {minimum_order} </p>
        <p>
          {description?.slice(0, 100)}
          {description?.length > 100 && (
            <span title={`${description}`}>...</span>
          )}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => navigate(`/productDetils/${_id}`)}
            className="btn btn-primary"
          >
            buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
