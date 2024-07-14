import React from "react";

// Sample data for categories
const categories = [
  {
    id: 1,
    name: "Glocery",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100",
  },
  {
    id: 2,
    name: "Mobiles",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    id: 3,
    name: "Fashion",
    image:
      "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100",
  },
  {
    id: 4,
    name: "Electronic",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100",
  },
  {
    id: 5,
    name: "Home and Furniture",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100",
  },
  {
    id: 6,
    name: "Appliance",
    image:
      "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100",
  },
  {
    id: 7,
    name: "Toys & Games",
    image:
      "https://rukminim1.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100",
  },
  {
    id: 8,
    name: "Books",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.sSiD-Vx7kyByAfg4GwFiNgHaFG&pid=Api&P=0&h=220",
  },
  {
    id: 9,
    name: "Music",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.tAjwhdI2Vr2r6nL_9hC36wHaHa&pid=Api&P=0&h=220",
  },
];

function Category() {
  return (
    <div
      className="overflow-x-auto whitespace-nowrap"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex py-4 gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className=" flex flex-col items-center  rounded mx-auto cursor-pointer"
            style={{ minWidth: "10rem", maxWidth: "10rem" }} // Adjust the width as needed
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 object-contain rounded-full"
              style={{ minWidth: "10rem", maxWidth: "10rem" }}
            />
            <p className="mt-2 text-center text-slate-800 font-semibold">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
