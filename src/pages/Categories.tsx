import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "../types";
import SEO from "../components/SEO";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading/Loading";
const CategoryCard = lazy(() => import("../components/CategoryCard"));
const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/data/categories.json");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <main className="container mx-auto py-8 mt-8 px-6">
      <SEO
        title="Categories - Explore Our Course Categories"
        description="Discover our wide range of course categories. Find the perfect category that fits your learning interests and goals."
        keywords="course categories, education, learning, categories, explore courses"
        author="Hasan Shamaa"
      />
      <h1 className="text-4xl font-bold mb-6 mt-6 text-center">
        Categories Page
      </h1>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-4  gap-6">
        {categories.map((category) => (
          <Suspense fallback={<Loading />} key={category.id}>
            <CategoryCard key={category.id} category={category} />
          </Suspense>
        ))}
      </div>
    </main>
  );
};

export default CategoriesPage;
