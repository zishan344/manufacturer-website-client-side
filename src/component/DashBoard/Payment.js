import React from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h2>id:{id}</h2>
    </div>
  );
};

export default Payment;
