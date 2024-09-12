import { useState } from "react";
import { Category } from "../types";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
}

const CategoryCardHover = ({ category }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg z-20 overflow-hidden max-w-[300px] w-full mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <LazyLoad height={200} offset={100} once>
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-48 object-cover transition-transform transform hover:scale-105"
        />
      </LazyLoad>

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-2">{category.title}</h3>
          <p className="text-gray-200 text-base line-clamp-3">
            {category.description}
          </p>
          <Link
            to={`/categories`}
            className="text-secondary mt-2 hover:underline"
          >
            Read More
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryCardHover;
