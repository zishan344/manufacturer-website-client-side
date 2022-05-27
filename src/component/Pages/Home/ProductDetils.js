import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
    fetch(`https://desolate-citadel-69075.herokuapp.com/product/${id}`, {
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
      setError(`Your order quantity should be in ${totalStock}`);
    } else if (value < orderQtyValue) {
      setError(`Quantity must be greater than ${orderQtyValue}`);
    } else {
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
        fetch(`https://desolate-citadel-69075.herokuapp.com/product/${id}`, {
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

        fetch("https://desolate-citadel-69075.herokuapp.com/booking", {
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
      }
    });

    e.target.reset();
  };

  return (
    <div className="bg-base-100 container mx-auto">
      <div className="hero-content flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col justify-center border-2 border-slate-300 p-5">
          <div>
            <img
              src={image}
              className=" flex w-[50%] mx-auto rounded-lg"
              alt="car parts"
            />
          </div>
          <div>
            <span className="font-semibold">{name}. </span>

            <span>
              Price: $<span className="font-semibold">{price}.</span>{" "}
            </span>
            <span className="text-slate-600">
              Available Product:{" "}
              <span className="font-semibold">{product_quantity}pcs.</span>{" "}
            </span>
            <span className=" text-slate-600">
              Minimum Order:{" "}
              <span className="font-semibold">{minimum_order}pcs.</span>{" "}
            </span>
            <h3 className="text-2xl my-6 font-bold font-medium">
              Product Description:
            </h3>
            <p className=" mt-2 mb-4">{description}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center py-4 bg-base-100">
            <div className="card w-full max-w-lg  bg-base-100">
              <div className="card-body">
                <h2 className="text-2xl font-bold text-secondary">
                  Purses Now
                </h2>
                <form onSubmit={formSubmit}>
                  <div className="form-control w-full max-w-lg">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      readOnly
                      value={user?.displayName}
                      placeholder="User Name"
                      className="input input-bordered w-full max-w-lg"
                    />
                  </div>
                  <div className="form-control w-full max-w-lg">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      name="email"
                      type="text"
                      disabled
                      readOnly
                      value={user?.email}
                      placeholder="Email"
                      className="input input-bordered w-full max-w-lg"
                    />
                  </div>

                  <label className="label mt-3">
                    <span className="label-text">Shipping Address</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    className="w-full max-w-lg textarea textarea-bordered"
                    placeholder="Shipping Address"
                  ></textarea>

                  <div className="form-control w-full max-w-lg">
                    <label className="label">
                      <span className="label-text">Phone number</span>
                    </label>
                    <input
                      required
                      name="number"
                      type="Number"
                      placeholder="Number"
                      className="input input-bordered w-full max-w-lg"
                    />
                  </div>
                  <div className="form-control w-full max-w-lg">
                    <label className="label">
                      <span className="label-text">Quantity</span>
                    </label>
                    <input
                      name="quantity"
                      onChange={handleOrderQty}
                      className="input input-bordered w-full max-w-lg"
                      type="number"
                      id="quantity"
                      title="Quantity"
                      value={inputValue || minimum_order}
                    />
                    <label className="label">
                      {error && (
                        <span className="label-text text-red-500">
                          {" "}
                          {error}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="form-control mt-6  ">
                    <button
                      disabled={error}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Book now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetils;
