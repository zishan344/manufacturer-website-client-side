import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FiCreditCard, 
  FiShield, 
  FiCheck, 
  FiUser,
  FiPackage,
  FiDollarSign,
  FiArrowLeft
} from "react-icons/fi";
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

  const { userName, product_name, totalPrice, image, quantity, price } = product;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard/myorder')}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to My Orders</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FiCreditCard className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
        <p className="text-gray-600">Review your order and complete the secure payment process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FiPackage className="w-5 h-5 mr-2 text-emerald-600" />
            Order Summary
          </h2>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Product Image & Name */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={product_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product_name}</h3>
                <p className="text-sm text-gray-600">Automotive Part</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-3 mb-3">
                <FiUser className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Customer:</span>
                <span className="text-sm font-medium text-gray-900">{userName}</span>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unit Price:</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{quantity} pcs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax & Fees:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-emerald-600">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-emerald-50 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-emerald-900 mb-3 flex items-center">
                <FiShield className="w-4 h-4 mr-2" />
                Secure Payment
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-emerald-800">
                  <FiCheck className="w-3 h-3 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-emerald-800">
                  <FiCheck className="w-3 h-3 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center text-sm text-emerald-800">
                  <FiCheck className="w-3 h-3 mr-2" />
                  <span>Secure card processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FiCreditCard className="w-5 h-5 mr-2 text-emerald-600" />
            Payment Details
          </h2>

          <div className="mb-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FiDollarSign className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="text-sm text-gray-600">Amount to pay</p>
                    <p className="text-2xl font-bold text-emerald-600">${totalPrice}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">For</p>
                  <p className="font-semibold text-gray-900">{userName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stripe Payment Form */}
          <div className="space-y-4">
            <Elements stripe={stripePromise}>
              <CheckoutForm product={product} />
            </Elements>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">We accept:</p>
            <div className="flex items-center space-x-3">
              <div className="px-3 py-2 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                VISA
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                MASTERCARD
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                AMEX
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                DISCOVER
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
