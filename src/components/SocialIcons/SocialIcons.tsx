import { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaGlobe,
} from "react-icons/fa";
import "./SocialIcons.css";

const SocialIcons = () => {
  const [showIcons, setShowIcons] = useState(false);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed md:block hidden top-1/2 left-4 transform -translate-y-1/2 space-y-4 z-[100]">
      <div
        className={`flex flex-col items-center ${
          showIcons ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="social-icons">
          <a
            href="https://wa.me/+963967600797"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-green-500 text-white"
            data-tooltip="WhatsApp"
          >
            <FaWhatsapp size={20} />
            <span className="tooltip-text">WhatsApp</span>
          </a>
          <a
            href="https://www.linkedin.com/in/hasan-shamaa-a02925288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-blue-700 text-white"
            data-tooltip="LinkedIn"
          >
            <FaLinkedinIn size={20} />
            <span className="tooltip-text">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/hasan.shamaa7?igsh=aHg5bWQwZW5sczd2"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-pink-500 text-white"
            data-tooltip="Instagram"
          >
            <FaInstagram size={20} />
            <span className="tooltip-text">Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/mahmod.lattakia.946?mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon bg-blue-600 text-white"
            data-tooltip="Facebook"
          >
            <FaFacebookF size={20} />
            <span className="tooltip-text">Facebook</span>
          </a>
        </div>
      </div>
      {showIcons === false && (
        <button
          onClick={toggleIcons}
          className="bg-white text-gray-800 p-3 rounded-full shadow-lg fixed top-4 right-4 z-50 transition-transform transform hover:scale-110"
        >
          <FaGlobe size={24} />
        </button>
      )}
    </div>
  );
};

export default SocialIcons;
