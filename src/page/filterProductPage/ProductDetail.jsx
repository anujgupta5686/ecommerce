import React, { useState, useEffect } from "react";
import imageSet from "../../assets/hero1.jpg";
import ReactImageMagnify from "react-image-magnify";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ShoppingCart, CreditCard } from "lucide-react"; // Ensure you have installed 'lucide-react' library

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const ProductDetail = () => {
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 768; // Adjust the breakpoint as needed

  return (
    <div className="container mx-auto p-4 grid lg:grid-cols-2 gap-4">
      <div className="relative w-full h-full flex justify-center items-center">
        {isSmallScreen ? (
          <img src={imageSet} alt="Sample Product" className="w-full h-auto" />
        ) : (
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Sample Product",
                isFluidWidth: true,
                src: imageSet,
              },
              largeImage: {
                src: imageSet,
                width: 1700,
                height: 750,
              },
              enlargedImagePosition: "beside",
              enlargedImageContainerDimensions: {
                width: "200%",
                height: "100%",
              },
              enlargedImageContainerStyle: {
                left: "100%",
                top: "0",
                width: "150%",
                height: "150%",
                position: "absolute",
              },
              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
              shouldUsePositiveSpaceLens: true,
              isHintEnabled: true,
              enlargedImageStyle: {
                objectFit: "cover",
                width: "100%",
                height: "100%",
              },
            }}
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Sample Product</h2>
          <p className="text-gray-700">
            This is a sample product description for testing purposes.
          </p>
          <p className="text-gray-800">Price: $29.99</p>
          <div className="flex items-center">
            <p className="text-gray-800">Rating: 4.5</p>
            <div className="flex items-center">
              {[...Array(4)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500 h-4 w-4" />
              ))}
              <FaRegStar className="text-yellow-500 h-4 w-4" />
            </div>
          </div>
          <p className="text-red-500">Discount: 10%</p>
          <div className="flex justify-start gap-5 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="text-xs">Add to Cart</span>
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2">
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="text-xs">Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
