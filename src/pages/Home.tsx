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
const CategoryCardHover = lazy(() => import("../components/CategoryCardHover"));
const CardCourses = lazy(() => import("../components/CardCourses"));

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const navigate = useNavigate();

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
    if (selectedPrice !== undefined)
      searchParams.set("price", selectedPrice.toString());
    if (selectedDate) searchParams.set("date", selectedDate);

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
        className="relative w-full h-screen md:h-[60vh] lg:h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/slider1.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 md:p-8 lg:p-12">
          <div className="bg-white p-4 mt-12 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-gray-700">
              Searching the Course
            </h1>
            <div className=" p-4 md:p-6 w-full max-w-4xl mx-auto flex flex-col gap-4 md:flex-row md:gap-2">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow"
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
                className="p-2 border text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Max Price"
                value={selectedPrice || ""}
                onWheel={(event) => event.currentTarget.blur()}
                onChange={(e) => setSelectedPrice(Number(e.target.value))}
                className="p-2 border text-primary border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent md:flex-grow"
              />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent rounded-md w-full md:flex-grow"
              />
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
      <h2 className="text-5xl text-center py-4 font-secondary mb-4 mt-6">
        Featured Courses
      </h2>
      <Suspense fallback={<Loading />}>
        <CardCourses
          courses={courses.slice(0, 4)}
          showCategory
          showDate
          showLocation
        />
      </Suspense>

      <div className="bg-gray-900 py-14 px-14">
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
        >
          {categorie.map((category) => (
            <SwiperSlide key={category.id}>
              <Suspense fallback={<Loading />}>
                <CategoryCardHover category={category} />
              </Suspense>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
      <Statistics />
      <HowMyCourses />
    </main>
  );
};

export default Home;
