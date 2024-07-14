import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/nature2.mp4"; // Update with the correct path to your video
// import backgroundVideo from "../assets/videoClip.mp4"; // Update with the correct path to your video
import "./otpStyle.css"; // Ensure your CSS for OtpInput styling is included

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    // Handle OTP verification and signup logic here
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-72px)] bg-gray-100">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] w-full">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-white border-opacity-30 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle="flex justify-center mb-4"
              renderInput={(props) => <input {...props} />}
              inputStyle="text-3xl w-12 h-12 border-2 rounded-md mx-1 focus:outline-none focus:border-blue-500"
            />
            <p className="text-blue-950 text-md mb-6 text-center">
              Enter the 6-digit code sent to your phone
            </p>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 text-center">
            <p
              //   href="/"
              onClick={() => {
                navigate(-1);
              }}
              className="text-indigo-500 hover:underline flex items-center justify-center cursor-pointer"
            >
              <AiFillHome className="mr-1" />
              Back to forget password page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
