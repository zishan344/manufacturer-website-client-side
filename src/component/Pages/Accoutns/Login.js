import React from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, Luser, Lloading, Lerror] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  if (guser || Luser) {
    navigate("/home");
  }
  console.log(Luser);
  let mrError;
  if (gerror || Lerror) {
    mrError = (
      <p className="mt-3 text-red-500">{gerror?.message || Lerror?.message}</p>
    );
  }
  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
    console.log(data);
  };

  return (
    <div class="flex justify-center py-4 bg-base-200">
      <div class="card w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 className="text-2xl font-bold text-primary">Please Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "provide a valid email",
                  },
                })}
                type="email"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="label">
                {errors?.email?.type === "required" && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
                {errors?.email?.type === "pattern" && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
                type="password"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="label">
                {errors?.password?.type === "required" && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <span className="">
                New to autovantis{" "}
                <Link className="underline text-blue-500" to="/register">
                  Please Register
                </Link>
              </span>
            </div>

            <div class="form-control mt-6  ">
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
        <div class="divider px-2">OR</div>
        <div className="text-center px-6 mb-4">
          <button
            onClick={() => signInWithGoogle()}
            class="btn w-full btn-outline btn-primary"
          >
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
