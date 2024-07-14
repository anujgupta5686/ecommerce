import React, { useState, useEffect } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import AddressForm from "./AddressForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyAddresses = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St, Anytown, State 1, 123456",
  },
  {
    id: 2,
    name: "Jane Doe",
    address: "456 Elm St, Othertown, State 2, 654321",
  },
];

const CheckoutPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState(dummyAddresses);
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

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (data) => {
    setAddresses([...addresses, { ...data, id: addresses.length + 1 }]);
    handleDialogClose();
  };

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="lg:col-span-1 col-span-3 bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <Button
              size="sm"
              onClick={handleDialogOpen}
              className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" /> Add a new address
            </Button>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="address">
              <AccordionTrigger className="text-lg font-semibold text-gray-800">
                Addresses
              </AccordionTrigger>
              <AccordionContent>
                {addresses.map((address) => (
                  <div key={address.id} className="border-b py-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="address"
                        id={`address-${address.id}`}
                        value={address.id}
                        onChange={() => handleAddressSelect(address.id)}
                        className="form-radio text-blue-600"
                      />
                      <label
                        htmlFor={`address-${address.id}`}
                        className="ml-2 text-gray-700 cursor-pointer"
                      >
                        {address.name}, {address.address}
                      </label>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:col-span-1 col-span-3 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Product Details
          </h1>
          <div className="space-y-4">
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
                    <p className="text-sm text-gray-800">
                      Price: ${product.price}
                    </p>
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
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={handleDialogClose}
          className="sm:max-w-[90%] sm:w-auto"
        >
          <DialogContent className="bg-white rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Add New Address
              </DialogTitle>
            </DialogHeader>
            <AddressForm
              onSubmit={handleFormSubmit}
              onClose={handleDialogClose}
            />
          </DialogContent>
        </Dialog>
        <div className="lg:col-span-1 col-span-3 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">
            Checkout Details
          </h1>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Number of Items:</span>{" "}
              {products.length}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Price:</span> $
              {products.reduce(
                (total, product) =>
                  total + product.price * (product.quantity || 0),
                0
              )}
            </p>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 mt-4">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
