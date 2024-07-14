import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./navigation.css";

const Carousel = ({ carouselData }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 2000 }}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      className="mySwiper"
    >
      {carouselData.map((item) => (
        <SwiperSlide key={item.id}>
          <Card className="w-full mx-auto shadow-lg carousel-card">
            <div
              className="carousel-card-image"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <CardHeader className="bg-slate-900 bg-opacity-50 text-white h-full flex justify-end items-center gap-5">
                <CardTitle className="text-[2rem] md:text-[3.5rem]">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-[1rem] md:text-[1.2rem] text-white">
                  {item.content}
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
