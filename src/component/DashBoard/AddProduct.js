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
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    console.log(data);
    reset();
  };
  return (
    <div class="flex justify-center py-4 bg-base-100">
      <div class="card w-full max-w-lg shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 className="text-2xl font-bold text-primary">Add A New Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Product Name</span>
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
                class="input input-bordered w-full max-w-lg"
              />
              <label class="label">
                {errors?.product_name?.type === "required" && (
                  <span className="text-red-500">
                    {errors.product_name.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Image Url</span>
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
                class="input input-bordered w-full max-w-lg"
              />
              <label class="label">
                {errors?.url?.type === "required" && (
                  <span className="text-red-500">{errors.url.message}</span>
                )}
              </label>
            </div>

            <label class="label mt-3">
              <span class="label-text">description</span>
            </label>
            <textarea
              {...register("description")}
              class="w-full max-w-lg textarea textarea-bordered"
              placeholder="description"
            ></textarea>

            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Product Price</span>
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
                class="input input-bordered w-full max-w-lg"
              />
              <label class="label">
                {errors?.price?.type === "required" && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Minimum Order</span>
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
                class="input input-bordered w-full max-w-lg"
              />
              <label class="label">
                {errors?.min_order?.type === "required" && (
                  <span className="text-red-500">
                    {errors.min_order.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Available Stock </span>
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
                class="input input-bordered w-full max-w-lg"
              />
              <label class="label">
                {errors?.stock?.type === "required" && (
                  <span className="text-red-500">{errors.stock.message}</span>
                )}
              </label>
            </div>

            <div class="form-control mt-6  ">
              <button type="submit" class="btn btn-primary">
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
