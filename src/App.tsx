import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import Schedule from "./pages/Schedule";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { CourseDetails } from "./pages/CourseDetail";
import ScrollToTopOnPageChange from "../ScrollToTopOnPageChange";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <>
      <ScrollToTopOnPageChange />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
