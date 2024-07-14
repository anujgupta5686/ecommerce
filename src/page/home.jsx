import React from "react";
import carouselData from "../page/custom/carouselData";
import categoryData from "../page/custom/categoryData";
import Carousel from "./carousel";
import Category from "./category";
import Electronic from "@/components/electronics";
import BeautiAndFood from "@/components/beauti-and-food";
import SportsAndHealthcare from "@/components/sport-and-healthcare";
import MobilesTopRange from "@/components/top-mobiles";
import ClothCollection from "@/components/cloths";

const Home = () => {
  return (
    <div>
      <Category categoryData={categoryData} />
      <div className=" flex items-center justify-center ">
        <Carousel carouselData={carouselData} />
      </div>

      <Electronic />
      <BeautiAndFood />
      <SportsAndHealthcare />
      <MobilesTopRange />
      <ClothCollection />
    </div>
  );
};

export default Home;
