import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for products
const productData = [
  {
    id: 1,
    name: "Earbuds",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.OltganOar5c6JNQJndhEwQHaHa&pid=Api&P=0&h=220",
    price: "$19.99",
  },
  {
    id: 2,
    name: "Speakers",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.my84-DYiIz3kRs_3f_MHHQHaHa&pid=Api&P=0&h=220",
    price: "$29.99",
  },
  {
    id: 3,
    name: "Watches",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.C178bqWOGmUdY5tlMqf4twHaHa&pid=Api&P=0&h=220",
    price: "$39.99",
  },
  {
    id: 4,
    name: "Camera",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.5wghnqzXgE1baKgWIyB7rAHaFS&pid=Api&P=0&h=220",
    price: "$49.99",
  },
  {
    id: 5,
    name: "LED TV",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.qscHwzIN7hJv2iYvx_-VCgHaGF&pid=Api&P=0&h=220",
    price: "$59.99",
  },
  {
    id: 6,
    name: "Shaved Trimmer",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.iZ73J9FzNiWbnTHSLB3QhgHaHa&pid=Api&P=0&h=220",
    price: "$69.99",
  },
  {
    id: 7,
    name: "Remotes",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.CKgehLu87FbP7QpSca53HgHaFR&pid=Api&P=0&h=220",
    price: "$79.99",
  },
  {
    id: 8,
    name: "Geyser",
    image:
      "https://tse2.mm.bing.net/th?id=OIP._2dpMKdsALiecXY5oGp7GgHaLi&pid=Api&P=0&h=220",
    price: "$89.99",
  },
  {
    id: 9,
    name: "Refrigerator",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.X0F98kPX-SOcnj_5HwdzFwHaHa&pid=Api&P=0&h=220",
    price: "$99.99",
  },
  {
    id: 10,
    name: "Juice Mixer",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.TCQPIIakflZa6a-NyvmLZAHaHC&pid=Api&P=0&h=220",
    price: "$109.99",
  },
];

const MobilesTopRange = () => {
  return (
    <>
      <h1 className="text-[2rem] font-semibold mt-5 text-slate-800">Mobile</h1>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={5}
        slidesPerGroup={3}
        loop={false}
        className="mySwiper"
      >
        {productData.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="w-full rounded-lg overflow-hidden shadow-lg mt-5 mb-5 cursor-pointer group mx-auto">
              <div className="relative">
                <div className=" cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mt-5"
                  />
                </div>
                <div className=" text-center">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{product.price}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobilesTopRange;
