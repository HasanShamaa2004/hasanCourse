import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import {
//   MenuItem,
//   InputLabel,
//   FormControl,
//   TextField,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CategoryIcon from "@mui/icons-material/Category";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import Select from "react-select";
import { FaChevronDown } from "react-icons/fa";
// import InputFrame from "./InputFrame";
const slideIn = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%" },
};

const options = [
  { value: "Tashkent", label: "Tashkent" },
  { value: "Bukhara", label: "Bukhara" },
  { value: "Samarkand", label: "Samarkand" },
];

const categoryOptions = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "VIP", label: "VIP" },
];
const HeroSection: React.FC = () => {
  const [animationKey, setAnimationKey] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="relative w-full h-[60vh] bg-gray-900 text-white">
      <div className="bg-black opacity-50 absolute w-full z-1 h-full"></div>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={() => setAnimationKey((prev) => prev + 1)}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <SwiperSlide
          onMouseEnter={() => setShowArrows(true)}
          onMouseDown={() => setShowArrows(false)}
          onMouseOver={() => setShowArrows(true)}
        >
          <div className="relative flex items-center justify-center h-full">
            <img
              src="/images/slider1.webp"
              alt="Slider 1"
              className="w-full h-full object-cover"
            />
            <motion.div
              key={animationKey}
              className="absolute md:top-1/3 sm:top-[5%] sm:left-[5%] sm:w-[90%] z-20 md:left-[8%] rounded-3xl md:w-[85%] border-4 border-white flex items-center justify-start md:flex-row flex-col"
              initial="hidden"
              animate="visible"
              variants={slideIn}
              transition={{ duration: 1 }}
            >
              <div className="relative bg-white text-gray-900 rounded-2xl p-8 w-full md:w-2/5 h-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Tashkent → Bukhara
                </h2>
                <p className="text-md md:text-lg">from 159 000 som</p>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          onMouseEnter={() => setShowArrows(true)}
          onMouseDown={() => setShowArrows(false)}
          onMouseOver={() => setShowArrows(true)}
        >
          <div className="relative flex items-center justify-center h-full">
            <img
              src="/images/bgcat.jpg"
              alt="Slider 2"
              className="w-full h-full object-cover"
            />
            <motion.div
              key={animationKey}
              className="absolute md:top-1/3 sm:top-[5%] sm:left-[5%] sm:w-[90%] md:left-[8%] rounded-3xl md:w-[85%] border-4 border-white flex items-center justify-start md:flex-row flex-col"
              initial="hidden"
              animate="visible"
              variants={slideIn}
              transition={{ duration: 1 }}
            >
              <div className="relative bg-white text-gray-900 rounded-2xl p-8 w-full md:w-2/5 h-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Bukhara → Samarkand
                </h2>
                <p className="text-md md:text-lg">from 179 000 som</p>
              </div>
            </motion.div>
          </div>
        </SwiperSlide>

        <div
          className={`swiper-button-next ${
            showArrows ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
        <div
          className={`swiper-button-prev ${
            showArrows ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        ></div>
      </Swiper>
      <div className="absolute bg-white w-[90%] md:w-[70%] left-1/2 rounded transform -translate-x-1/2 bottom-0 translate-y-[50%] p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Search for Flights and Categories
        </h2>
        <div className="flex flex-col border border-primary rounded-lg md:flex-row items-center space-y-4 md:space-y-0">
          <div className="relative flex flex-col w-full md:w-1/3">
            <div
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="border-b-2 text-primary p-2 font-semibold cursor-pointer flex justify-between items-center"
            >
              {location || "Select Location"}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isLocationOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isLocationOpen && (
              <div className="absolute bg-white text-primary w-full top-11 rounded-lg shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setLocation(option.value);
                      setIsLocationOpen(false);
                    }}
                    className="p-2 hover:bg-gray-300 cursor-pointer"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block h-7 border-l-2 border-primary" />

          <div className="relative flex flex-col w-full md:w-1/3">
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="border-b-2 text-primary p-2 font-semibold cursor-pointer flex justify-between items-center"
            >
              {category || "Select Category"}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isCategoryOpen && (
              <div className="absolute bg-white text-primary w-full top-11 rounded-lg shadow-lg z-10">
                {categoryOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setCategory(option.value);
                      setIsCategoryOpen(false);
                    }}
                    className="p-2 hover:bg-gray-300 cursor-pointer"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:block h-7 border-l-2 border-primary" />

          <div className="relative flex items-center w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by title ... "
              className="border-b-2 p-2 w-full font-semibold outline-none text-primary placeholder:text-primary"
            />
            <button
              type="submit"
              className="absolute right-0 bg-primary rounded text-white px-[8px] py-[7px]"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
