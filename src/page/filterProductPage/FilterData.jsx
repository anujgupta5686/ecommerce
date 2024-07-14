import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ShoppingCart, CreditCard } from "lucide-react";

const FilterData = ({ sortOption }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={index} className="text-yellow-500 h-4 w-4" />
          ))}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={index} className="text-yellow-500 h-4 w-4" />
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="relative w-full flex flex-col">
            <CardHeader>
              <button
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                onClick={() => toggleLike(product.id)}
              >
                {likedProducts.includes(product.id) ? (
                  <HiHeart className="text-red-500" />
                ) : (
                  <HiOutlineHeart />
                )}
              </button>
              <div className="w-full h-48 flex justify-center items-center overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <div className="flex-grow">
                <CardTitle className="text-sm text-gray-900">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-600 mb-2">
                  {product.category}
                </CardDescription>
                <p className="mb-2 text-sm text-gray-700">
                  {product.description.length > 50
                    ? product.description.substring(0, 50) + "..."
                    : product.description}
                </p>
                <p className="text-sm text-gray-800">Price: ${product.price}</p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800">
                    Rating: {product.rating.rate}
                  </p>
                  {renderStars(product.rating.rate)}
                  <p className="text-xs text-gray-600 ml-2">
                    ({product.rating.count} reviews)
                  </p>
                </div>
                {product.discountPercentage && (
                  <p className="text-sm text-red-500">
                    Discount: {product.discountPercentage}%
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="default"
                  className="flex items-center space-x-2"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span className="text-xs">Add to Cart</span>
                </Button>
                <Button
                  variant="primary"
                  className="flex items-center space-x-2 bg-[#d03333] text-white"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="text-xs ">Buy Now</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FilterData;
