const Statistics = () => {
  return (
    <div className="bg-primary text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold">150+</h3>
          <p className="mt-2">Courses Offered</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">1200+</h3>
          <p className="mt-2">Satisfied Students</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">30+</h3>
          <p className="mt-2">Expert Instructors</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">4.9/5</h3>
          <p className="mt-2">Average Rating</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
