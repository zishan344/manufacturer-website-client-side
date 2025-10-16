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
  // eslint-disable-next-line no-unused-vars
  const [updateProfile, updating, Uerror] = useUpdateProfile(auth);

  const [createUserWithEmailAndPassword, Ruser, Rloading, Rerror] =
    useCreateUserWithEmailAndPassword(auth);
  // eslint-disable-next-line no-unused-vars
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
              ✨ Join Our Community
            </div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Start Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 block">
                Amazing Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Create your account and unlock a world of possibilities with our innovative platform.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">1000+</span> happy members
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-sm">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Easy Setup</h3>
              <p className="text-gray-600 text-sm">Quick registration process</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-sm">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Get Started</h3>
              <p className="text-gray-600 text-sm">Begin your journey today</p>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 transition-all duration-300">
            
            {/* Header */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
              <p className="text-gray-600 text-sm">Join us today and get started!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name and Email Row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name required",
                      },
                    })}
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Password and Phone Row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password required",
                      },
                      minLength: {
                        value: 6,
                        message: "Min 6 chars"
                      }
                    })}
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone (Optional)"
                    className="w-full px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I agree to the <span className="text-emerald-600 hover:underline cursor-pointer font-semibold">Terms</span> and <span className="text-emerald-600 hover:underline cursor-pointer font-semibold">Privacy</span>
                </label>
              </div>

              {/* Error Display */}
              {mrError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
                  {mrError}
                </div>
              )}

              {/* Register Button */}
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg text-sm"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-xs font-medium">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group text-sm"
              >
                <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Sign In Link */}
              <div className="text-center mt-3 p-3 bg-gray-50/50 rounded-xl">
                <p className="text-gray-600 text-xs">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-semibold"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
