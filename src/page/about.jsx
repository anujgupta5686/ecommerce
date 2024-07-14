import React from "react";
import aboutImage from "../assets/ecommerce1.jpg"; // Update with the correct path to your image

const About = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${aboutImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-1"></div>
      <div className="relative z-10 text-center p-6 text-white">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate__animated animate__fadeInUp">
          About Us
        </h2>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl animate__animated animate__fadeInUp animate__delay-0.5s">
          We are passionate about bringing the best products to our customers.
          Our mission is to make your shopping experience seamless and
          enjoyable.
        </p>
      </div>
    </div>
  );
};

export default About;
