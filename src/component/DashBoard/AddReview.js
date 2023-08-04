import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const { description, user_name, rating } = data;
    const product = {
      description,
      user_name,
      rating,
      image: user?.photoURL,
    };
    fetch("https://autovantis.onrender.com/review", {
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
          <h2 className="text-2xl font-bold text-secondary">Add A Review</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                {...register("user_name", {
                  required: {
                    value: true,
                    message: "User_Name is required",
                  },
                })}
                type="text"
                readOnly
                value={user?.displayName}
                placeholder="User Name"
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

            <label className="label mt-3">
              <span className="label-text">description</span>
            </label>
            <textarea
              {...register("description")}
              className="w-full max-w-lg textarea textarea-bordered"
              placeholder="description"></textarea>

            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">Rating number</span>
              </label>
              <input
                {...register("rating", {
                  required: {
                    value: true,
                    message: "rating order is required",
                  },
                })}
                type="Number"
                min="1"
                max="5"
                placeholder="Rating "
                className="input input-bordered w-full max-w-lg"
              />
              <label className="label">
                {errors?.rating?.type === "required" && (
                  <span className="text-red-500">{errors.rating.message}</span>
                )}
              </label>
            </div>

            <div className="form-control mt-6  ">
              <button type="submit" className="btn btn-primary">
                send feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
