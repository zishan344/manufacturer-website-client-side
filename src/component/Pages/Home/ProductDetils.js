import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { 
  FiShoppingCart, 
  FiPackage, 
  FiTruck, 
  FiDollarSign,
  FiMinus,
  FiPlus,
  FiShield,
  FiStar,
  FiCheck
} from "react-icons/fi";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
const ProductDetils = () => {
  const { id } = useParams();
  const [user, loading, Uerror] = useAuthState(auth);
  // const [product, setProduct] = useState({});
  const [inputValue, setInputvalu] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery(["product", id], () =>
    fetch(`https://autovantis.onrender.com/product/${id}`, {
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
  const {
    _id,
    image,
    description,
    name,
    price,
    minimum_order,
    product_quantity,
  } = product;
  const handleOrderQty = (event) => {
    setInputvalu(event.target.value);
    const value = Number(event.target.value);
    const orderQtyValue = Number(minimum_order);
    const totalStock = Number(product_quantity);
    if (value > totalStock) {
      setError(`Your order quantity should be maximum ${totalStock}`);
    } else if (value < orderQtyValue) {
      setError(`Quantity must be greater than ${orderQtyValue}`);
    } else {
      setError("");
    }
  };

  const incrementQuantity = () => {
    const currentValue = Number(inputValue) || Number(minimum_order);
    const newValue = currentValue + 1;
    if (newValue <= Number(product_quantity)) {
      setInputvalu(newValue);
      setError("");
    }
  };

  const decrementQuantity = () => {
    const currentValue = Number(inputValue) || Number(minimum_order);
    const newValue = currentValue - 1;
    if (newValue >= Number(minimum_order)) {
      setInputvalu(newValue);
      setError("");
    }
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    const email = e.target.email.value;
    const shipignAddress = e.target.description.value;
    const number = e.target.number.value;
    const productQuantity = e.target.quantity.value;
    if (productQuantity == 0) {
      return toast.error(`sorry minimum order ${minimum_order}`);
    }
    if (Number(product_quantity) < Number(productQuantity)) {
      return toast.error("product not available");
    }

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        const totalProduct = Number(product_quantity) - Number(productQuantity);
        const total = Number(productQuantity) * Number(price);

        const updateBody = {
          image,
          description,
          name,
          price,
          minimum_order,
          product_quantity: totalProduct,
        };
        fetch(`https://autovantis.onrender.com/product/${id}`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(updateBody),
        })
          .then((res) => res.json())
          .then((result) => {
            refetch();
          });
        const booking = {
          productId: _id,
          userName,
          product_name: name,
          email,
          image,
          shipignAddress,
          number,
          price,
          quantity: productQuantity,
          totalPrice: total,
        };

        fetch("https://autovantis.onrender.com/booking", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(booking),
        })
          .then((res) => res.json)
          .then((data) => {
            toast.success("product added successfully check the order");
          });
        Swal.fire({
          title: "Order Confirmed!",
          text: "Your order has been placed successfully.",
          icon: "success",
          confirmButtonColor: "#10b981"
        });
      }
    });

    e.target.reset();
  };

  const totalPrice = (Number(inputValue) || Number(minimum_order)) * Number(price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Product Section - Compact */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 h-fit">
              {/* Product Image - Compact */}
              <div className="aspect-square w-full max-w-xs mx-auto mb-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Product Info - Fluid */}
              <div className="space-y-3">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">{name}</h1>
                
                {/* Price & Stock - Compact Inline */}
                <div className="flex space-x-2">
                  <div className="flex-1 flex items-center space-x-2 p-2 bg-emerald-50 rounded-lg">
                    <FiDollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="text-lg font-bold text-emerald-600">${price}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                    <FiPackage className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Stock</p>
                      <p className="text-lg font-bold text-blue-600">{product_quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info - Fluid */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center py-1 px-2 bg-gray-50 rounded text-xs">
                    <span className="text-gray-700">Min Order:</span>
                    <span className="font-semibold">{minimum_order} pcs</span>
                  </div>
                  <div className="flex justify-between items-center py-1 px-2 bg-gray-50 rounded text-xs">
                    <span className="text-gray-700">Status:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiCheck className="w-2 h-2 mr-1" />
                      Available
                    </span>
                  </div>
                </div>

                {/* Description - Compact */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Description</h3>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{description}</p>
                </div>

                {/* Features - Ultra Compact */}
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center space-x-1 text-gray-600 py-1">
                    <FiShield className="w-3 h-3 text-emerald-600" />
                    <span>Quality</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 py-1">
                    <FiTruck className="w-3 h-3 text-emerald-600" />
                    <span>Fast Ship</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 py-1">
                    <FiStar className="w-3 h-3 text-emerald-600" />
                    <span>Premium</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 py-1">
                    <FiCheck className="w-3 h-3 text-emerald-600" />
                    <span>Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form - Fluid */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <FiShoppingCart className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Place Order</h2>
              </div>

              <form onSubmit={formSubmit} className="space-y-4">
                {/* User Info - Fluid Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      readOnly
                      value={user?.displayName || ''}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      readOnly
                      value={user?.email || ''}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>

                {/* Contact & Address - Fluid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Phone Number</label>
                    <input
                      required
                      name="number"
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Quantity</label>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={decrementQuantity}
                        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-sm"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      
                      <input
                        name="quantity"
                        onChange={handleOrderQty}
                        className="flex-1 px-2 py-2 text-sm border border-gray-200 rounded-lg text-center font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        type="number"
                        value={inputValue || minimum_order}
                        min={minimum_order}
                        max={product_quantity}
                      />
                      
                      <button
                        type="button"
                        onClick={incrementQuantity}
                        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-sm"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address - Full Width */}
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Shipping Address</label>
                  <textarea
                    name="description"
                    required
                    rows="2"
                    placeholder="Complete shipping address"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  ></textarea>
                </div>

                {/* Validation & Info */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs">{error}</p>
                  </div>
                )}
                
                <p className="text-gray-500 text-xs">
                  Min: {minimum_order} pcs • Max: {product_quantity} pcs available
                </p>

                {/* Order Summary - Compact & Fluid */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 space-y-2">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600 text-xs">Unit Price</p>
                      <p className="font-semibold">${price}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-xs">Quantity</p>
                      <p className="font-semibold">{inputValue || minimum_order}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-xs">Total</p>
                      <p className="text-lg font-bold text-emerald-600">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Compact */}
                <button
                  disabled={error}
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Place Order Now</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetils;
