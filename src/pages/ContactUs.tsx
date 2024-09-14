import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully!", {
        position: "bottom-right",
      });
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };
  return (
    <main className="container mx-auto mt-16 py-8 px-6">
      <SEO
        title="Contact Us - Your Course Website"
        description="Get in touch with us for any inquiries or questions about our courses and services. We'd love to hear from you!"
        keywords="contact, courses, inquiries, get in touch"
        author="Hasan Shamaa"
      />
      <h1 className="text-4xl font-bold mb-6 mt-12 text-center">Contact Us</h1>
      <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3"
        >
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-semibold">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition duration-300"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="text-primary mr-3" />
            <p className="text-gray-700">+123-456-7890</p>
          </div>
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-primary mr-3" />
            <p className="text-gray-700">contact@yourdomain.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-primary mr-3" />
            <p className="text-gray-700">123 Your Street, City, Country</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ContactUs;
