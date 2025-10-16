import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ product }) => {
  const [cardError, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { _id, userName, email, product_name, totalPrice } = product;
  useEffect(() => {
    fetch("https://autovantis.onrender.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [totalPrice]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setError(error?.message || "");
    setSuccess(" ");
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email,
          },
        },
      });
    if (intentError) {
      setProcessing(false);

      setError(intentError?.message);
    } else {
      console.log(paymentIntent);
      setTransactionId(paymentIntent?.id);
      setError(" ");
      // store payment on the database
      const payment = {
        booking: _id,
        transactionId: paymentIntent?.id,
      };
      fetch(`https://autovantis.onrender.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
          
          // Show success message
          toast.success("Payment completed successfully!");
          
          // Auto-redirect to orders page after 2 seconds
          setTimeout(() => {
            navigate('/dashboard/myorder');
          }, 2000);
        });
      setSuccess("Payment completed successfully! Redirecting to your orders...");
    }
  };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Input */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  fontFamily: '"Inter", system-ui, sans-serif',
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
          />
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Pay $${totalPrice}`
          )}
        </button>
      </form>

      {/* Error Message */}
      {cardError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm font-medium">{cardError}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-green-800 font-medium">{success}</p>
              {transactionId && (
                <p className="text-green-700 text-sm mt-1">
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
