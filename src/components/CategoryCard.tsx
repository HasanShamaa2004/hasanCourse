import { useState } from "react";
import { Category } from "../types";
import LazyLoad from "react-lazyload";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <LazyLoad height={200} offset={100} once>
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-48 object-cover"
        />
      </LazyLoad>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
        <p
          className={`text-gray-700 ${
            isExpanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {category.description}
        </p>
        <button
          onClick={handleToggleDescription}
          className="text-primary mt-2 hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
