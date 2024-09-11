import { Link, useLocation } from "react-router-dom";
import { Course } from "../types";
import { useCartStore } from "../store/cartStore";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
import LazyLoad from "react-lazyload";

export const CourseDetails = () => {
  const { state: course } = useLocation();
  const addCourse = useCartStore((state) => state.addCourse);
  function handleAddToCart(course: Course) {
    addCourse(course);
    toast.success("Added To Cart !!", {
      position: "bottom-right",
    });
  }

  return (
    <main className="flex flex-col gap-16 px-6 py-10 bg-gray-100 overflow-x-hidden">
      <SEO
        title={course.title}
        description={course.description}
        keywords={`${course.title}, ${course.category}, ${course.price}`}
        author="Hasan Shamaa"
      />
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-start w-full max-w-screen-lg">
        <div className="w-full md:w-[400px] lg:w-[600px] flex justify-center">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <LazyLoad height={200} offset={100} once>
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-md"
              />
            </LazyLoad>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 w-full md:w-[600px] lg:w-[800px]">
          <p className="text-gray-500">
            {"Home / "}
            <Link to="/courses" className="text-primary hover:text-yellow-500">
              Courses
            </Link>
            {` / ${course.title}`}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {course.title}
          </h2>
          <span className="font-semibold text-lg">
            Price:{" "}
            <span className="text-2xl font-bold text-yellow-500">
              $ {course.price}
            </span>
          </span>
          <span className="font-semibold text-lg">
            Category: {course.category}
          </span>
          <span className="font-semibold text-lg">Date: {course.date}</span>
          <span className="font-semibold text-lg">
            Location: {course.isOnline ? "Online" : course.location}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-primary">Description</h3>
            <p className="text-gray-800">{course.description}</p>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleAddToCart(course)}
              className="bg-primary text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-500"
            >
              Add to Cart
            </button>
            <Link
              to="/courses"
              className="bg-secondary text-primary px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-700 hover:text-secondary"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
