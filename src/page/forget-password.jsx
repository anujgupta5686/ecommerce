import React from "react";
import { useForm } from "react-hook-form";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/nature.mp4"; // Update with the correct path to your video
// import backgroundVideo from "../assets/videoClip.mp4"; // Update with the correct path to your video
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordToken } from "@/Redux/Actions/user";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(forgetPasswordToken(data));
    // handle form submission, e.g., send data to server
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-white border-opacity-30">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
            Reset your password
          </h2>
          <p className="text-center text-md text-black mb-6">
            Have no fear. We'll email you instructions to reset your password.
            If you don't have access to your email we can try account recovery.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email Address *</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-indigo-500 hover:underline flex items-center justify-center"
            >
              <AiFillHome className="mr-1" />
              Back to homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
