import { Course } from "../types";
import { motion } from "framer-motion";

type CoursesListProps = {
  courses: Course[];
};

const CoursesList = ({ courses }: CoursesListProps) => (
  <motion.ul
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {courses.map((course) => (
      <motion.li
        key={course.id}
        className="bg-white text-primary p-4 rounded shadow"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-bold">{course.title}</h3>
        <p>{course.description}</p>
      </motion.li>
    ))}
  </motion.ul>
);

export default CoursesList;
