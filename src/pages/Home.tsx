import { useEffect, useState } from "react";
import axios from "axios";
import SEO from "../components/SEO";
import { Category, Course } from "../types";
// import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Suspense, lazy } from "react";
import { Pagination } from "swiper/modules";
import Loading from "../components/Loading/Loading";
import HowMyCourses from "../components/HowMyCourses";
import Statistics from "../components/Statistics";
import SocialIcons from "../components/SocialIcons/SocialIcons";
import NewsTicker from "../components/NewsTicker/NewsTicker";
// import { motion } from "framer-motion";
// import Select, { selectClasses } from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import { FaListAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import HeroSection from "../components/HeroSection";
const CategoryCardHover = lazy(() => import("../components/CategoryCardHover"));
const CardCourses = lazy(() => import("../components/CardCourses/CardCourses"));

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [_categories, setCategories] = useState<string[]>([]);
  const [_locations, setLocations] = useState<string[]>([]);
  // const [searchQuery, _setSearchQuery] = useState<string>("");
  // const [selectedCategory, _setSelectedCategory] = useState<string | null>(null);
  // const [selectedLocation, _setSelectedLocation] = useState<string | null>(null);

  // const navigate = useNavigate();
  // const images1 = ["/images/slider1.webp", "/images/bgcat.jpg"];
  const images = [
    "/images/trust/trust1.png",
    "/images/trust/trust2.png",
    "/images/trust/trust3.jpg",
    "/images/trust/trust4.png",
    "/images/trust/trust5.png",
    "/images/trust/trust6.jpg",
    "/images/trust/trust7.jpg",
    "/images/trust/trust8.png",
    "/images/trust/trust9.png",
    "/images/trust/trust10.png",
    "/images/trust/trust11.jpg",
    "/images/trust/trust12.png",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ courses: Course[] }>(
          "/data/courses.json"
        );
        setCourses(response.data.courses);
        setCategories([
          ...new Set(
            response.data.courses
              .map((c) => c.category)
              .filter((category): category is string => category !== undefined)
          ),
        ]);
        setLocations([
          ...new Set(
            response.data.courses
              .map((c) => c.location)
              .filter((location): location is string => location !== undefined)
          ),
        ]);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };
    fetchData();
  }, []);

  const [categorie, setCategorie] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/data/categories.json");
        setCategorie(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // const handleSearch = () => {
  //   const searchParams = new URLSearchParams();
  //   if (searchQuery) searchParams.set("title", searchQuery);
  //   if (selectedCategory) searchParams.set("category", selectedCategory);
  //   if (selectedLocation) searchParams.set("location", selectedLocation);
  //   navigate(`/courses?${searchParams.toString()}`);
  // };

  return (
    <main className="bg-white text-gray-700 min-h-screen">
      <SEO
        title="Welcome to Our Course Website"
        description="Discover the latest courses in technology, business, and design."
        keywords="courses, technology, business, design"
        author="Hasan Shamaa"
      />
      {/* <div className="relative h-[35vh] md:h-[40vh] lg:h-[50vh]">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {images1.map((img, index) => (
            <SwiperSlide key={index} className="swiper-slide1">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 flex mt-12 items-center justify-start z-20 p-6">
          <div className="text-left mb-8 ml-6 p-4 bg-transparent">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary font-bold text-white mb-4">
                Front End Developer
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl font-primary text-white">
                <strong>Date:</strong> 20th September 2024
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-primary text-white">
                <strong>Location:</strong> Online
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-primary text-white">
                <strong>Category:</strong> Web Development
              </p>
            </motion.div>
          </div>

          <div className="w-full max-w-4xl bg-white translate-y-[80%] p-5 rounded-lg shadow-lg relative">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-primary font-semibold text-gray-700">
                Find Your Course
              </h3>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              <motion.div
                className="flex flex-col lg:flex-row gap-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 p-3 w-full rounded-md text-gray-900 focus:ring-4 outline-none border border-gray-300"
                    style={{ height: "3rem" }}
                  />
                </div>
                <div className="relative flex-1">
                  <Select
                    placeholder="Select a category..."
                    value={selectedCategory}
                    onChange={(_e, value) => setSelectedCategory(value)}
                    indicator={<KeyboardArrowDown />}
                    startDecorator={<FaListAlt />}
                    sx={{
                      width: "100%",
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                    }}
                    style={{ height: "3rem" }}
                  >
                    {categories.map((category) => (
                      <Option key={category} value={category}>
                        {category}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="relative flex-1">
                  <Select
                    placeholder="Select a location..."
                    value={selectedLocation}
                    onChange={(_e, value) => setSelectedLocation(value)}
                    indicator={<KeyboardArrowDown />}
                    startDecorator={<FaMapMarkerAlt />}
                    sx={{
                      width: "100%",
                      [`& .${selectClasses.indicator}`]: {
                        transition: "0.2s",
                        [`&.${selectClasses.expanded}`]: {
                          transform: "rotate(-180deg)",
                        },
                      },
                    }}
                    style={{ height: "3rem" }}
                  >
                    {locations.map((location) => (
                      <Option key={location} value={location}>
                        {location}
                      </Option>
                    ))}
                  </Select>
                </div>
              </motion.div>
              <motion.button
                className="bg-secondary text-white rounded-md px-3 flex-shrink-0 transition-all duration-300"
                onClick={handleSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </div>
      </div> */}
      <HeroSection />
      <h2 className="text-5xl text-center py-4 font-secondary mb-4 mt-[100px]">
        UpComing Courses
      </h2>
      <div className="px-14">
        <Suspense fallback={<Loading />}>
          <CardCourses
            courses={courses.slice(0, 5)}
            showCategory
            showDate
            showLocation
          />
        </Suspense>
      </div>
      <Statistics />
      <div className="bg-gray-900 py-14 px-20">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          pagination={{ clickable: true }}
          // navigation={{
          //   prevEl: ".swiper-button-prev",
          //   nextEl: ".swiper-button-next",
          // }}
          modules={[Pagination, Autoplay]}
          autoplay={{ disableOnInteraction: true }}
          className="swiper-container"
        >
          {categorie.map((category) => (
            <SwiperSlide key={category.id}>
              <Suspense fallback={<Loading />}>
                <CategoryCardHover category={category} />
              </Suspense>
            </SwiperSlide>
          ))}
          {/* <div className="swiper-button-next">Next</div>
          <div className="swiper-button-prev">Prev</div> */}
        </Swiper>
      </div>
      <HowMyCourses />
      <div className="px-20">
        <NewsTicker images={images} />
      </div>
      <SocialIcons />
    </main>
  );
};

export default Home;
