import React, { useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../../Shared/Loading";

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, Luser, Lloading, Lerror] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [token] = useToken(guser || Luser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  let mrError;
  if (gerror || Lerror) {
    mrError = (
      <p className="mt-3 text-red-500">{gerror?.message || Lerror?.message}</p>
    );
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };
  if (gloading || Lloading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center py-4 bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-secondary"> Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
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
                onBlur={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors?.email?.type === "required" && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
                {errors?.email?.type === "pattern" && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors?.password?.type === "required" && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                <span
                  onClick={async () => {
                    if (!email) {
                      return toast.error("input a valid email");
                    }
                    await sendPasswordResetEmail(email);
                    toast.success("send email successfully");
                  }}
                  className="label-text-alt text-blue-500 link link-hover"
                >
                  Forgot password?
                </span>
              </label>
              <span className="">
                New to autovantis{" "}
                <Link className="underline text-blue-500" to="/register">
                  Register
                </Link>
              </span>
            </div>
            {mrError}
            <div className="form-control mt-6  ">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="divider px-2">OR</div>
        <div className="text-center px-6 mb-4">
          <button
            onClick={() => signInWithGoogle()}
            className="btn w-full btn-outline btn-secondary"
          >
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
