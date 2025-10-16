import React, { useEffect, useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import auth from "../../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../../Shared/Loading";

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, Luser, Lloading, Lerror] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
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
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
        {gerror?.message || Lerror?.message}
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,210,255,0.15) 1px, transparent 0)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
      
      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Welcome Back
            </div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Continue Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 block">
                Digital Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access your account and explore amazing features designed to enhance your experience.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">1000+</span> users trust us
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-sm">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Secure Login</h3>
              <p className="text-gray-600 text-sm">Advanced security protocols</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-sm">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Fast Access</h3>
              <p className="text-gray-600 text-sm">Quick and easy sign-in</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 transition-all duration-300">
            
            {/* Header */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <FaLock className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign In</h2>
              <p className="text-gray-600 text-sm">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
                  </div>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please provide a valid email",
                      },
                    })}
                    type="email"
                    onBlur={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                </div>
                {errors?.email && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                    <div className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 text-xs font-bold">!</span>
                    </div>
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
                  </div>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors?.password && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs mt-1">
                    <div className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 text-xs font-bold">!</span>
                    </div>
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                  <span className="text-xs text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) {
                      return toast.error("Please enter your email first");
                    }
                    await sendPasswordResetEmail(email);
                    toast.success("Password reset email sent successfully");
                  }}
                  className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-semibold"
                >
                  Forgot password?
                </button>
              </div>

              {mrError}

              {/* Login Button */}
              <button
                type="submit"
                disabled={Lloading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg text-sm"
              >
                {Lloading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Sign In to Account</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-xs font-medium">or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={() => signInWithGoogle()}
              disabled={gloading}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group text-sm"
            >
              {gloading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaGoogle className="text-lg text-red-500 group-hover:scale-110 transition-transform duration-200" />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-3 p-3 bg-gray-50/50 rounded-xl">
              <p className="text-gray-600 text-xs">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-semibold"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
