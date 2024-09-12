import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Menu, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const totalCourses = useCartStore((state) => state.getTotalCourses());

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 px-6 py-6 w-full z-30 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-gray-900 shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-white italic text-3xl font-bold font-logo">
          My Courses
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={` ${
              isMenuOpen ? "hidden" : "block"
            } text-white text-3xl`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <ul
          className={`hidden md:flex space-x-8 items-center transition-all duration-300 ${
            isScrolled ? "text-white" : "text-gray-200"
          }`}
        >
          <li>
            <Link to="/" className="hover:text-secondary text-lg ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-secondary text-lg">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-secondary text-lg">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-secondary text-lg">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="hover:text-secondary text-lg">
              Timing Courses
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="relative flex items-center justify-center hover:text-secondary text-lg"
            >
              <FiShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCourses}
              </span>
            </Link>
          </li>
        </ul>

        <aside
          className={`fixed top-0 left-0 h-full w-3/4 bg-gray-900 z-40 transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } duration-300 md:hidden`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-white text-2xl">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="text-white text-3xl" />
            </button>
          </div>
          <ul className="flex flex-col space-y-6 p-4 text-white">
            <li>
              <Link
                to="/"
                className="hover:text-secondary border-b border-transparent hover:border-secondary pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-secondary border-b border-transparent hover:border-secondary pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-secondary border-b border-transparent hover:border-secondary pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-secondary border-b border-transparent hover:border-secondary pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/schedule"
                className="hover:text-secondary border-b border-transparent hover:border-secondary pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Timing Courses
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="relative flex items-center justify-start hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="text-2xl" />
                <span className="absolute -top-2 left-4 bg-secondary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCourses}
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </nav>
    </header>
  );
};

export default Navbar;
