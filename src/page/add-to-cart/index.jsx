import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AddToCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.slice(0, 2).map((product) => ({ ...product, quantity: 1 }))
        ); // Limiting to first 2 products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleIncrement = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: (product.quantity || 0) + 1 }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleDecrement = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: Math.max((product.quantity || 0) - 1, 0) }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleRemove = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const calculateTotalItems = () => {
    return products.reduce(
      (total, product) => total + (product.quantity || 0),
      0
    );
  };

  const calculateTotalPrice = () => {
    return products
      .reduce(
        (total, product) => total + product.price * (product.quantity || 0),
        0
      )
      .toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Details */}
        {products.map((product) => (
          <Card key={product.id} className="relative flex flex-col">
            <CardHeader>
              <div className="w-full h-48 flex justify-center items-center overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <div className="flex-grow">
                <CardTitle className="text-sm text-gray-900">
                  {product.title}
                </CardTitle>
                <p className="mb-2 text-sm text-gray-700">
                  {product.description.substring(0, 50) + "..."}
                </p>
                <p className="text-sm text-gray-800">Price: ${product.price}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Button
                    onClick={() => handleDecrement(product.id)}
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4">{product.quantity || 0}</span>
                  <Button
                    onClick={() => handleIncrement(product.id)}
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => handleRemove(product.id)}
                  className="ml-2 bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Checkout Details */}
      <div className="lg:col-span-2 mt-8">
        <Card className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-800 mb-4">
            Checkout Details
          </CardTitle>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">
                Number of Items:
              </span>
              <span className="text-gray-700">{calculateTotalItems()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Total Price:</span>
              <span className="text-gray-700">${calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Checkout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddToCart;
