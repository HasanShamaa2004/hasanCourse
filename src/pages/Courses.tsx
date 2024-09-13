import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../types";
import SEO from "../components/SEO";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";
const CardCourses = lazy(() => import("../components/CardCourses"));

const Courses = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQueryParam = params.get("title") || "";
  const categoryParam = params.get("category") || "All";
  const locationParam = params.get("location") || "All";
  const priceParam = params.get("price") || "";
  const dateParam = params.get("date") || "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState(categoryParam);
  const [locationFilter, setLocationFilter] = useState(locationParam);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [price, setPrice] = useState(priceParam);
  const [date, setDate] = useState(dateParam);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<{ courses: Course[] }>(
          "/data/courses.json"
        );
        const coursesData = response.data.courses;
        setCourses(coursesData);
        const categories = Array.from(
          new Set(
            coursesData
              .map((course) => course.category)
              .filter((cat): cat is string => cat !== undefined)
          )
        );
        const locations = Array.from(
          new Set(
            coursesData
              .map((course) => course.location)
              .filter((loc): loc is string => loc !== undefined)
          )
        );
        setCategories(categories);
        setLocations(locations);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filterCourses = () => {
      let filtered = courses;
      if (category !== "All") {
        filtered = filtered.filter((course) => course.category === category);
      }
      if (locationFilter !== "All") {
        filtered = filtered.filter(
          (course) => course.location === locationFilter
        );
      }
      if (searchQuery) {
        filtered = filtered.filter((course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (price) {
        filtered = filtered.filter(
          (course) =>
            course.price !== undefined && course.price <= Number(price)
        );
      }
      if (date) {
        filtered = filtered.filter((course) => course.date === date);
      }

      setFilteredCourses(filtered);
    };

    filterCourses();
  }, [searchQuery, category, locationFilter, price, date, courses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <main className="container px-6 mx-auto py-8">
      <SEO
        title="Courses - Explore Our Wide Range of Courses"
        description="Browse and search through our diverse range of courses. Filter by category, location, and more to find the perfect course for you."
        keywords="courses, course categories, online courses, in-person courses, search courses"
        author="Hasan Shamaa"
      />
      <h1 className="text-4xl font-bold mb-6 mt-14 text-center">
        Courses Page
      </h1>
      <div className="p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Search Courses
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Category
            </label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="All">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Location
            </label>
            <select
              value={locationFilter}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="All">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block mb-1 text-gray-700 font-semibold">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              onWheel={(event) => event.currentTarget.blur()}
              placeholder="Max Price"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </div>
      </div>
      {filteredCourses.length === 0 ? (
        <h1 className="text-4xl text-center text-primary">No Results Found</h1>
      ) : (
        <Suspense fallback={<Loading />}>
          <CardCourses
            courses={filteredCourses}
            showCategory
            showLocation
            showPrice
            showDate
          />
        </Suspense>
      )}
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "30px",
            padding: "10px",
            backgroundColor: "#FBB040",
            borderRadius: "50%",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </main>
  );
};

export default Courses;
