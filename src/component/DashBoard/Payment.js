import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L17frAwpofeLPggaDvCY2dAq1bY46D2natT2D0o3pHj0PdxUKZt1wEakm37uihs819MIALDFrgk2LTB2Ae4bm4e00V1m7fslz"
);
const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["order", id], () =>
    fetch(`https://autovantis.onrender.com/userBooking/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(product);
  const { userName, product_name, totalPrice, image } = product;
  return (
    <div className="card max-w-lg bg-base-100 mx-auto shadow-xl text-primary-content">
      <div className="card-body ">
        <h2 className="card-title text-secondary text-sm"> Hello {userName}</h2>
        <p className="font-bold text-xl">
          Please pay for <span className="text-secondary">{product_name}</span>{" "}
        </p>
        <div className="flex justify-center">
          <img className="w-[50%] p-8" src={image} alt="" />
        </div>
        <p>Please pay ${totalPrice}</p>

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm product={product} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
