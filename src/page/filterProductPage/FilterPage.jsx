import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import FilterData from "./FilterData";

function FilterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [categories, setCategories] = useState([]);
  const { register, watch, setValue } = useForm();
  const formData = watch();
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch category data from the API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const categorySet = new Set(data.map((item) => item.category));
        const uniqueCategories = Array.from(categorySet).map(
          (category, index) => ({ id: index + 1, category })
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setValue(name, checked ? value : null);
    console.log("Checkbox Change:", { name, value, checked });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log("Sort Change:", event.target.value);
  };

  return (
    <div className="w-screen flex">
      <div
        className={`border-r border-t transition-all duration-300 relative ${
          isMobile ? (isSidebarOpen ? "w-64" : "w-16") : "w-64"
        }`}
        style={{ height: "calc(100vh - 73px)", overflowY: "auto" }}
      >
        <div className="w-full mt-5 p-2">
          <Accordion type="multiple" collapsible>
            {/* Ratings Accordion */}
            <AccordionItem value="ratings">
              <AccordionTrigger>CUSTOMER RATINGS</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      value="5"
                      {...register("ratings.fiveStars")}
                      onChange={handleCheckboxChange}
                    />
                    5 Stars
                  </label>
                  <label className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      value="4"
                      {...register("ratings.fourStars")}
                      onChange={handleCheckboxChange}
                    />
                    4 Stars
                  </label>
                  <label className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      value="3"
                      {...register("ratings.threeStars")}
                      onChange={handleCheckboxChange}
                    />
                    3 Stars
                  </label>
                  <label className="flex items-center">
                    <Checkbox
                      className="mr-2"
                      value="2"
                      {...register("ratings.twoStars")}
                      onChange={handleCheckboxChange}
                    />
                    2 Stars
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Dynamic Category Accordion */}
            <AccordionItem value="category">
              <AccordionTrigger>CATEGORIES</AccordionTrigger>
              <AccordionContent>
                <div>
                  {categories.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-2">
                      <label className="flex items-center">
                        <Checkbox
                          className="mr-2"
                          value={item.category}
                          {...register(`category.${item.name}`)}
                          onChange={handleCheckboxChange}
                        />
                        {item.category}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-black p-[1px] absolute text-[1.5rem] right-0 cursor-pointer z-50"
          >
            {isSidebarOpen ? <IoMdArrowDropleft /> : <IoMdArrowDropright />}
          </button>
        )}
      </div>

      <div
        className={`transition-all duration-300 border p-5 ${
          isMobile
            ? isSidebarOpen
              ? "w-full"
              : "w-[calc(100%-4rem)]"
            : "w-full"
        }`}
      >
        <div className="flex items-center space-x-2 mb-4 justify-end">
          <Select onChange={handleSortChange} defaultValue="price-asc">
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
        </div>

        {/* Pass the sortOption to FilterData component */}
        <FilterData sortOption={sortOption} />
      </div>
    </div>
  );
}

export default FilterPage;
