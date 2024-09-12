import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const handelSubscribe = () => {
    toast.success("Subscribe Success !!", {
      position: "bottom-right",
    });
  };
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto text-center px-8">
        <div className="flex md:justify-start lg:ml-4 justify-center">
          <Link
            to="/"
            className="text-white text-3xl font-bold font-logo italic"
          >
            My Courses
          </Link>
        </div>

        <div className=" text-white py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-primary mb-6">Join Our Newsletter</h2>
            <p className="text-lg mb-8">
              Get the latest updates on new courses, special offers, and events.
            </p>
            <input
              type="email"
              className="w-full md:w-1/2 p-3 rounded-lg text-gray-900 outline-none"
              placeholder="Enter your email address"
            />
            <button
              onClick={handelSubscribe}
              className="mt-4 bg-secondary hover:bg-yellow-500 text-primary font-semibold px-8 py-3 -ml-[8px]  shadow-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-8 mb-4">
          <a
            href="https://wa.me/+963967600797"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-500 p-3 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/hasan-shamaa-a02925288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 p-3 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/hasan.shamaa7?igsh=aHg5bWQwZW5sczd2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-pink-500 p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/mahmod.lattakia.946?mibextid=ZbWKwL" // استبدلها برابط الفيسبوك الخاص بك
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <FaFacebookF />
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
