import {
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaDollarSign,
  FaTags,
} from "react-icons/fa";
import { Course } from "../types";
import { Link } from "react-router-dom";

type CardCoursesProps = {
  courses: Course[];
  showPrice?: boolean;
  showCategory?: boolean;
  showLocation?: boolean;
  showDescription?: boolean;
  showDate?: boolean;
};

const CardCourses = ({
  courses,
  showPrice = false,
  showCategory = false,
  showLocation = false,
  showDescription = false,
  showDate = false,
}: CardCoursesProps) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            state={course}
            key={course.id}
            className="bg-white text-primary rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              {showDescription && (
                <p className="text-gray-600 mb-3">{course.description}</p>
              )}
              {showDate && (
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-1 text-yellow-500" />
                  <strong className="mr-1">Date:</strong> {course.date}
                </p>
              )}
              {showCategory && (
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaTags className="mr-1 text-purple-500" />
                  <strong className="mr-1">Category:</strong> {course.category}
                </p>
              )}
              {showPrice && (
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaDollarSign className="mr-1 text-green-500" />
                  <strong className="mr-1">Price:</strong> ${course.price}
                </p>
              )}
              {showLocation && (
                <div className="text-gray-700 mb-2 flex items-center">
                  <strong className="mr-2">Location :</strong>
                  {course.isOnline ? (
                    <>
                      <FaGlobe className="mr-1 text-blue-500" />
                      <p>Online</p>
                    </>
                  ) : (
                    <>
                      <FaMapMarkerAlt className="mr-1 text-red-500" />
                      <p>{course.location}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardCourses;
