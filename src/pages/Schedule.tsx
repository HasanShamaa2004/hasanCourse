import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "../types";
import SEO from "../components/SEO";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";
const CardSchedule = lazy(() => import("../components/CardSchedule"));
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
        setFilteredCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  const handleFilter = () => {
    let filtered = courses;

    const searchNumber = parseFloat(searchQuery);

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

    if (dateFilter) {
      filtered = filtered.filter((course) => course.date === dateFilter);
    }

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

    setFilteredCourses(filtered); // Update the filtered courses after applying the filters
  };

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
      <h1 className="text-4xl font-bold mb-6 mt-12 text-center">
        Timing Courses
      </h1>
      <SEO
        title="Course Schedule - Your Course Website"
        description="Explore our course schedule and find the perfect courses to fit your needs. Use our filters to search by title, date, and price."
        keywords="course schedule, course calendar, search courses, course dates, price range"
        author="Hasan Shamaa"
      />
      <div className="p-4 rounded-lg mb-8">
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
          <div className="flex-none mt-4 md:mt-0">
            <button
              onClick={handleFilter}
              className="bg-secondary mt-6 text-white py-2 px-6 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <section>
        {filteredCourses.map((course) => (
          <Suspense fallback={<Loading />} key={course.id}>
            <CardSchedule
              key={course.id}
              course={course}
              onAddToCart={handleAddToCart}
            />
          </Suspense>
        ))}
      </section>
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

export default Schedule;
