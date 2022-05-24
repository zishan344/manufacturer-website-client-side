import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./productDetils.css";
const ProductDetils = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "GET",
      headers: {
        authorization: `Berar ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  const {
    _id,
    image,
    description,
    name,
    price,
    minimum_order,
    product_quantity,
  } = product;
  const [inputvalu, setInputvalu] = useState(100);

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
                value={inputvalu}
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
            <button class="btn btn-bordered">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetils;
