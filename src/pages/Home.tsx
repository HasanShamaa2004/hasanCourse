import { useEffect, useState } from "react";
import axios from "axios";
import SEO from "../components/SEO";
import { Category, Course } from "../types";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Suspense, lazy } from "react";
import { Navigation, Pagination } from "swiper/modules";
import Loading from "../components/Loading/Loading";
import HowMyCourses from "../components/HowMyCourses";
import Statistics from "../components/Statistics";
import SocialIcons from "../components/SocialIcons/SocialIcons";
import NewsTicker from "../components/NewsTicker/NewsTicker";
const CategoryCardHover = lazy(() => import("../components/CategoryCardHover"));
const CardCourses = lazy(() => import("../components/CardCourses/CardCourses"));

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const navigate = useNavigate();
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

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set("title", searchQuery);
    if (selectedCategory) searchParams.set("category", selectedCategory);
    if (selectedLocation) searchParams.set("location", selectedLocation);
    navigate(`/courses?${searchParams.toString()}`);
  };

  return (
    <main className="bg-white text-gray-700 min-h-screen">
      <SEO
        title="Welcome to Our Course Website"
        description="Discover the latest courses in technology, business, and design."
        keywords="courses, technology, business, design"
        author="Hasan Shamaa"
      />
      <div
        className="relative w-full h-screen md:h-[40vh] lg:h-[50vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/slider1.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col md:justify-end justify-center items-center text-center">
          <div className="bg-white border border-secondary max-w-7xl w-full p-4 mb-[-80px] rounded-lg shadow-lg">
            <h1 className="text-4xl font-secondary font-semibold text-gray-700">
              Searching the Course
            </h1>
            <div className=" p-4 md:p-6 w-full mx-auto flex flex-col gap-4 md:flex-row md:gap-2">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow placeholder:font-bold"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border text-primary border-gray-300 focus:outline-none font-semibold focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow placeholder:font-bold"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-2 border text-primary border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow placeholder:font-bold"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-secondary hover:bg-yellow-500 text-xl text-primary font-semibold px-6 py-2 rounded-md w-full md:w-auto"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-5xl text-center py-4 font-secondary mb-4 mt-24">
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
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            disableOnInteraction: true,
          }}
          className="test"
        >
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          {categorie.map((category) => (
            <SwiperSlide key={category.id}>
              <Suspense fallback={<Loading />}>
                <CategoryCardHover category={category} />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <HowMyCourses />
      <NewsTicker images={images} />
      <SocialIcons />
    </main>
  );
};

export default Home;
