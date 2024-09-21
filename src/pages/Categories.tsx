import { useEffect, useState } from "react";
import axios from "axios";
import { Category, Course } from "../types";
import SEO from "../components/SEO";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
const CategoryCard = lazy(() => import("../components/CategoryCard"));
const CategoriesPage = () => {
  const [categorie, setCategorie] = useState<Category[]>([]);
  const [_courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const navigate = useNavigate();
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
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set("title", searchQuery);
    if (selectedCategory) searchParams.set("category", selectedCategory);
    if (selectedLocation) searchParams.set("location", selectedLocation);
    navigate(`/courses?${searchParams.toString()}`);
  };
  const optionAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  return (
    <main className="min-h-screen">
      <SEO
        title="Categories - Explore Our Course Categories"
        description="Discover our wide range of course categories. Find the perfect category that fits your learning interests and goals."
        keywords="course categories, education, learning, categories, explore courses"
        author="Hasan Shamaa"
      />
      <div
        className="relative w-full h-screen md:h-[40vh] lg:h-[50vh]  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/bgcat.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col md:justify-end justify-center items-center text-center">
          <div className="bg-gray-800 max-w-7xl w-full p-5 mb-[-130px] rounded-lg shadow-2xl space-y-8">
            <motion.h1
              className="text-5xl font-secondary font-bold text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Searching the Course
            </motion.h1>
            <motion.div
              className="p-6 w-full mx-auto flex flex-col gap-8 md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-4 border text-gray-900 font-primary border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary focus:border-transparent rounded-lg w-full md:flex-grow placeholder:font-semibold placeholder:text-gray-600 bg-white transition-all duration-300"
                whileFocus={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                whileHover={{ scale: 1.03 }}
              />

              <motion.select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-4 border text-gray-900 font-primary border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary focus:border-transparent rounded-lg w-full md:flex-grow bg-white transition-all duration-300"
                whileFocus={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.option
                  value=""
                  className="text-gray-700 font-semibold"
                  initial="hidden"
                  animate="visible"
                  variants={optionAnimation}
                >
                  All Categories
                </motion.option>
                {categories.map((category) => (
                  <motion.option
                    key={category}
                    value={category}
                    className="text-gray-700 font-semibold"
                    initial="hidden"
                    animate="visible"
                    variants={optionAnimation}
                  >
                    {category}
                  </motion.option>
                ))}
              </motion.select>

              <motion.select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-4 border text-gray-900 font-primary border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary focus:border-transparent rounded-lg w-full md:flex-grow bg-white transition-all duration-300"
                whileFocus={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.option
                  value=""
                  className="text-gray-700 font-semibold"
                  initial="hidden"
                  animate="visible"
                  variants={optionAnimation}
                >
                  All Locations
                </motion.option>
                {locations.map((location) => (
                  <motion.option
                    key={location}
                    value={location}
                    className="text-gray-700 font-semibold"
                    initial="hidden"
                    animate="visible"
                    variants={optionAnimation}
                  >
                    {location}
                  </motion.option>
                ))}
              </motion.select>

              <motion.button
                onClick={handleSearch}
                className="bg-primary hover:bg-secondary text-xl text-white font-bold px-8 py-4 rounded-lg w-full md:w-auto shadow-lg transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                Search
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-6 py-6 mt-36 text-center">
        Categories Page
      </h1>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-5 gap-4 px-6 py-8 ">
        {categorie.map((category) => (
          <Suspense fallback={<Loading />} key={category.id}>
            <CategoryCard key={category.id} category={category} />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

export default CategoriesPage;
