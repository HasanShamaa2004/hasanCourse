import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="bg-primary text-white py-12 px-6">
      <h2 className="text-4xl text-center font-secondary mb-8">
        Why Choose Us
      </h2>
      <div className="container mx-auto grid md:grid-cols-3 gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-secondary shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
          <p>Learn from the best in the industry with years of experience.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-6 rounded-lg bg-secondary shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
          <p>
            Access courses online or attend in-person classes as per your
            schedule.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="p-6 rounded-lg bg-secondary shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4">Affordable Pricing</h3>
          <p>We offer quality education at competitive rates.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
