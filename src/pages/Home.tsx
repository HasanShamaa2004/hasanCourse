import { useEffect, useState } from "react";
import axios from "axios";
import SEO from "../components/SEO";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Course } from "../types";
import CardCourses from "../components/CardCourses";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WhyChooseUs from "../components/WhyChooseUs";
import ClientTestimonials from "../components/ClientTestimonials";

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<Course[]>([]);
  const [secondFilter, setSecondFilter] = useState<Course[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/courses.json");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      const fill = courses.slice(0, 3);
      setFilter(fill);
      const secondFill = courses.slice(3, 6);
      setSecondFilter(secondFill);
    }
  }, [courses]);

  const images = [
    "/images/slider1.webp",
    "/images/slider2.webp",
    "/images/slider3.webp",
  ];

  return (
    <main className="bg-primary text-white min-h-screen">
      <SEO
        title="Welcome to Our Course Website"
        description="Discover the latest courses in technology, business, and design."
        keywords="courses, technology, business, design"
        author="Hasan Shamaa"
      />

      <div className="relative h-[90vh] w-full overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative h-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-60
                flex flex-col items-center justify-center text-center px-4"
              >
                <motion.h1
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    delay: 0.8,
                  }}
                  className="text-5xl md:text-6xl font-bold font-primary text-white leading-tight"
                >
                  Welcome to Our Course Website
                </motion.h1>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                  }}
                  className="text-lg md:text-xl mt-6 max-w-2xl text-gray-200 leading-relaxed"
                >
                  Join us to explore a variety of courses tailored to enhance
                  your skills and knowledge. Whether you're looking for online
                  classes or in-person experiences, we have something for
                  everyone.
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 1.3,
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                  }}
                >
                  <Link
                    to={"/schedule"}
                    className="mt-8 inline-block bg-secondary hover:bg-yellow-500 text-primary font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300"
                  >
                    Explore Course Schedule
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h2 className="text-4xl text-center py-4 font-secondary mb-4 mt-6">
        Featured Courses
      </h2>
      <CardCourses courses={filter} showCategory showDate showLocation />
      <WhyChooseUs />
      <ClientTestimonials />
      <h2 className="text-4xl text-center py-4 font-secondary mb-4 mt-6">
        Best Selling
      </h2>
      <CardCourses courses={secondFilter} showCategory showDate showLocation />
    </main>
  );
};

export default Home;
