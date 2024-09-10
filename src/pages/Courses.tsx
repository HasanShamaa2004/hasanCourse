import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../types";
import CardCourses from "../components/CardCourses";
import SEO from "../components/SEO";

const CoursesPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState(categoryParam || "All");
  const [locationFilter, setLocationFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/data/courses.json");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((course) => course.category === category);
    }

    // Filter by location (online or in-person)
    if (locationFilter !== "All") {
      if (locationFilter === "Online") {
        filtered = filtered.filter((course) => course.isOnline);
      } else {
        filtered = filtered.filter((course) => !course.isOnline);
      }
    }
    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [category, locationFilter, searchQuery, courses]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
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
      <h1 className="text-4xl font-bold mb-6 mt-12 text-center">
        Courses Page
      </h1>
      <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
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
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Health">Health</option>
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
            <option value="Online">Online</option>
            <option value="InPerson">In-Person</option>
          </select>
        </div>
      </div>

      <CardCourses
        courses={filteredCourses}
        showCategory
        showLocation
        showPrice
      />
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "30px",
            padding: "10px",
            backgroundColor: "#FBB040",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ↑
        </button>
      )}
    </main>
  );
};

export default CoursesPage;
