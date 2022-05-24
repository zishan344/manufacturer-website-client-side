import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
import "./productDetils.css";

const ProductDetils = () => {
  const { id } = useParams();
  const [user, loading, Uerror] = useAuthState(auth);
  // const [product, setProduct] = useState({});
  const [inputvalu, setInputvalu] = useState("");
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery("product", () =>
    fetch(`http://localhost:5000/product/${id}`, {
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
  /*  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "GET",
      headers: {
        authorization: `Berar ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setProduct(data));
  }, [id]); */

  const addedCart = () => {
    const confirm = window.confirm("are sure addde this product");
    if (!confirm) {
      return;
    }
    if (Number(product_quantity) < Number(inputvalu)) {
      return toast.error("product not available");
    }
    const totalProduct = Number(product_quantity) - Number(inputvalu);
    const updateBody = {
      image,
      description,
      name,
      price,
      minimum_order,
      product_quantity: totalProduct,
    };
    fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(updateBody),
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
        console.log(result);
      });
    const booking = {
      productId: _id,
      image,
      name,
      price,
      email: user?.email,
      quantity: inputvalu,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json)
      .then((data) => {
        toast.success("product added successfully check the order");
        console.log(data);
      });
  };
  const up = (e) => {
    const quantity = Number(inputvalu) + 1;
    if (quantity > Number(product_quantity)) {
      return toast.error(`sorry product not available`);
    }
    setInputvalu(quantity);
  };
  const down = () => {
    const downQuantity = Number(inputvalu) - 1;
    if (downQuantity < Number(minimum_order)) {
      return toast.error(`sorry minimum order ${minimum_order}`);
    }
    setInputvalu(downQuantity);
  };

  return (
    <div class="hero min-h-screen bg-base-100 container mx-auto">
      <div class="hero-cont flex-col lg:flex-row gap-8">
        <div className="flex-1 flex justify-center  border-2 border-slate-300 p-12">
          <img
            src={image}
            className="max-w-sm lg:max-w-lg rounded-lg shadow-2xl"
            alt="car parts"
          />
        </div>
        <div className="flex-1">
          <h2 class="text-5xl font-bold">{name}</h2>
          <h2 className="text-3xl font-bold my-4">
            Price: $<span className="text-xxl">{price}</span>{" "}
          </h2>
          <h2 className="font-medium text-slate-600 font-bold">
            Available product {product_quantity}{" "}
          </h2>
          <h2 className="font-bold font-medium text-slate-600">
            Minimum order {minimum_order}{" "}
          </h2>
          <p class=" my-10">{description}</p>
          <div class="action-top d-sm-flex">
            <div class="pro-qty mr-3 mb-4 mb-sm-0">
              <label for="quantity" class="sr-only">
                Quantity
              </label>
              <input
                onChange={(e) => {
                  if (Number(e.target.value) > Number(product_quantity)) {
                    return toast.error("sorry product not available");
                  } else {
                    return setInputvalu(e.target.value);
                  }
                }}
                type="number"
                min={minimum_order}
                max={product_quantity}
                id="quantity"
                title="Quantity"
                defaultValue={minimum_order}
              />
              <button
                onClick={up}
                class="inc qty-btn bts flex justify-center items-center"
              >
                +
              </button>
              <button
                onClick={down}
                class="dec qty-btn bts flex justify-center items-center"
              >
                -
              </button>
            </div>
            <button onClick={addedCart} class="btn btn-bordered">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetils;
