import { useEffect, useState } from "react";
import axios from "axios";
import CardSchedule from "../components/CardSchedule";
import { Course } from "../types";
import SEO from "../components/SEO";

const Schedule = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/data/courses.json");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Parse search query as a number
    const searchNumber = parseFloat(searchQuery);

    // Filter by search query (title or price)
    if (searchQuery) {
      filtered = filtered.filter((course) => {
        const titleMatch = course.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const priceMatch =
          !isNaN(searchNumber) &&
          course.price !== undefined &&
          course.price === searchNumber;
        return titleMatch || priceMatch;
      });
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((course) => course.date === dateFilter);
    }

    // Filter by price range
    if (minPrice !== undefined) {
      filtered = filtered.filter(
        (course) => course.price !== undefined && course.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter(
        (course) => course.price !== undefined && course.price <= maxPrice
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, dateFilter, minPrice, maxPrice, courses]);

  const handleAddToCart = (course: Course) => {
    console.log("Added to cart:", course);
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
    <section className="container px-6 mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 mt-12 text-center">
        Schedule Page
      </h1>
      <SEO
        title="Course Schedule - Your Course Website"
        description="Explore our course schedule and find the perfect courses to fit your needs. Use our filters to search by title, date, and price."
        keywords="course schedule, course calendar, search courses, course dates, price range"
        author="Hasan Shamaa"
      />
      <div className="bg-white shadow-lg p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Search Courses
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or price..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-700 font-semibold">
              Date
            </label>
            <input
              type="date"
              value={dateFilter || ""}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block mb-1 text-gray-700 font-semibold">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice !== undefined ? minPrice : ""}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                onWheel={(event) => event.currentTarget.blur()}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice !== undefined ? maxPrice : ""}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                onWheel={(event) => event.currentTarget.blur()}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {filteredCourses.map((course) => (
          <CardSchedule
            key={course.id}
            course={course}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
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
    </section>
  );
};

export default Schedule;
