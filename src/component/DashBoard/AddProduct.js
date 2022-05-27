import React from "react";
import { useForm } from "react-hook-form";
const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const { description, min_order, price, product_name, stock, url } = data;
    const product = {
      name: product_name,
      image: url,
      description,
      price,
      minimum_order: min_order,
      product_quantity: stock,
    };
    fetch("https://desolate-citadel-69075.herokuapp.com/product", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    reset();
  };
  return (
    <div className="flex justify-center py-4 bg-base-100">
      <div className="card w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-secondary">
            Add A New Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("product_name", {
                  required: {
                    value: true,
                    message: "product_name is required",
                  },
                })}
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.product_name?.type === "required" && (
                  <span className="text-red-500">
                    {errors.product_name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Image Url</span>
              </label>
              <input
                {...register("url", {
                  required: {
                    value: true,
                    message: "Image url is required",
                  },
                })}
                type="text"
                placeholder="Image url"
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.url?.type === "required" && (
                  <span className="text-red-500">{errors.url.message}</span>
                )}
              </label>
            </div>

            <label className="label mt-3">
              <span className="label-text">description</span>
            </label>
            <textarea
              {...register("description")}
              className="w-full max-w-lg textarea textarea-bordered"
              placeholder="description"
            ></textarea>

            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                {...register("price", {
                  required: {
                    value: true,
                    message: "price is required",
                  },
                })}
                type="Number"
                placeholder="Price"
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.price?.type === "required" && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Minimum Order</span>
              </label>
              <input
                {...register("min_order", {
                  required: {
                    value: true,
                    message: "minimum order is required",
                  },
                })}
                type="Number"
                placeholder="minimum order"
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.min_order?.type === "required" && (
                  <span className="text-red-500">
                    {errors.min_order.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Available Stock </span>
              </label>
              <input
                {...register("stock", {
                  required: {
                    value: true,
                    message: "product stock is required",
                  },
                })}
                type="Number"
                placeholder="available product"
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.stock?.type === "required" && (
                  <span className="text-red-500">{errors.stock.message}</span>
                )}
              </label>
            </div>

            <div className="form-control mt-6  ">
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
