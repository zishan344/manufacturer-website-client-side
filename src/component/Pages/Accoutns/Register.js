import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../../Shared/Loading";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [updateProfile, updating, Uerror] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword, Ruser, Rloading, Rerror] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [token] = useToken(guser || Ruser);
  console.log(Ruser);
  const navigate = useNavigate();
  if (token) {
    navigate("/home");
  }
  let mrError;
  if (gerror || Rerror || Uerror) {
    mrError = (
      <p className="mt-3 text-red-500">
        {gerror?.message || Rerror?.message || Uerror.message}
      </p>
    );
  }
  if (gloading || Rloading || Uerror) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    const { email, password } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
  };
  return (
    <div class="flex justify-center py-4 bg-base-200">
      <div class="card w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 className="text-2xl font-bold text-secondary">
            Register An Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "name is required",
                  },
                })}
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Name"
                class="input input-bordered w-full max-w-xs"
              />
              <label class="label">
                {errors?.name?.type === "required" && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </label>
            </div>
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
                placeholder="Email"
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
                placeholder="Password"
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
                Already have an account{" "}
                <Link className="underline text-blue-500" to="/login">
                  Login
                </Link>
              </span>
              {mrError}
            </div>

            <div class="form-control mt-6  ">
              <button type="submit" class="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
        <div class="divider px-2">OR</div>
        <div className="text-center px-6 mb-4">
          <button
            onClick={() => signInWithGoogle()}
            class="btn w-full btn-outline btn-secondary"
          >
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
