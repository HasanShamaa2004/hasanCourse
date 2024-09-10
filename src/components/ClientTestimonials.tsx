import { FaQuoteLeft } from "react-icons/fa";

const ClientTestimonials = () => {
  return (
    <section className="bg-primary text-white py-10">
      <div className="container mx-auto flex justify-center flex-col items-center text-center px-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          What Our Clients Say
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs mx-auto mb-8 md:mb-0">
            <div className="flex justify-center mb-4">
              <FaQuoteLeft className="text-yellow-500 text-5xl" />
            </div>
            <p className="text-lg mb-4">
              "The courses offered were outstanding. I gained valuable knowledge
              and skills that have greatly enhanced my career prospects."
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs mx-auto mb-8 md:mb-0">
            <div className="flex justify-center mb-4">
              <FaQuoteLeft className="text-yellow-500 text-5xl" />
            </div>
            <p className="text-lg mb-4">
              "The instructors were incredibly knowledgeable and supportive. I
              highly recommend these courses to anyone looking to advance their
              skills."
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs mx-auto">
            <div className="flex justify-center mb-4">
              <FaQuoteLeft className="text-yellow-500 text-5xl" />
            </div>
            <p className="text-lg mb-4">
              "A transformative experience! The skills and knowledge I gained
              were exactly what I needed to take my career to the next level."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
