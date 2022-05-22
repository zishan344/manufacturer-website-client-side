import React from "react";
import { useParams } from "react-router-dom";

const ProductDetils = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};

export default ProductDetils;
