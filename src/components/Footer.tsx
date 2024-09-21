import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const handleSubscribe = () => {
    toast.success("Subscribe sent successfully!", {
      position: "bottom-right",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4">
      <div className="container mx-auto text-center px-8">
        <div className="flex md:justify-start lg:ml-4 justify-center">
          <Link to="/" className="text-white text-3xl font-bold ml-3">
            <img src="/images/logo.png" alt="Logo" className="w-24 h-24" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ml-8 mt-12">
          {/* Column 1: Site Links */}
          <div className="text-left">
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul>
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="mb-2">
                <Link to="/categories">Categories</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Courses */}
          <div className="text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Courses</h3>
            <ul>
              <li className="mb-2">
                <Link to="/courses">Web Development</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses">Data Science</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses">Design</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses">Marketing</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses">More Courses</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="text-left">
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h3>
            <p className="mb-2">Company Name: Hasan Courses</p>
            <p className="mb-2">Location: 1234 Street Name, City, Country</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Email: contact@yourcompany.com</p>
          </div>

          {/* Column 4: Join Our Newsletter */}
          <div className="text-left">
            <h3 className="text-xl font-semibold text-white mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-lg mb-8">
              Get the latest updates on new courses, special offers, and events.
            </p>
            <input
              type="email"
              className="w-full p-3 rounded-lg text-gray-900 outline-none mb-4"
              placeholder="Enter your email address"
            />
            <button
              onClick={handleSubscribe}
              className="bg-secondary hover:bg-yellow-500 text-primary font-semibold px-8 py-3 rounded shadow-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
          © 2024 Hasan Courses. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
