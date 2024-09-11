import React from "react";
import { Course } from "../types";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom"; // لاستخدامه للتنقل إلى صفحة التفاصيل
import { toast } from "react-toastify";

interface CardScheduleProps {
  course: Course;
  onAddToCart: (course: Course) => void;
}

const CardSchedule: React.FC<CardScheduleProps> = ({ course, onAddToCart }) => {
  const addCourse = useCartStore((state) => state.addCourse);

  const handleAddToCart = () => {
    addCourse(course);
    if (onAddToCart) onAddToCart(course);
    toast.success("Added To Cart !!", {
      position: "bottom-right",
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="w-full md:w-1/4 p-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      <div className="w-full md:w-3/4 p-4 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-primary mb-2">
          {course.title}
        </h3>
        <span className="text-lg  text-yellow-500 mb-2">
          <strong>Price:</strong> ${course.price ?? "N/A"}
        </span>
        <span className="text-gray-700 mb-2">
          <strong>Date:</strong> {course.date}
        </span>
        <div className="flex space-x-4 justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-500"
          >
            Add to Cart
          </button>
          <Link
            to={`/courses/${course.id}`}
            state={course}
            className="bg-gray-500 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-600"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardSchedule;
