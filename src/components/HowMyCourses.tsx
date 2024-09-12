const HowMyCourses = () => {
  return (
    <div className="bg-gray-100 py-16">
      <h2 className="text-5xl text-center text-primary font-secondary mb-10">
        How My Courses Works?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary p-4 rounded-full">
            <img
              src="/icons/search.svg"
              alt="Search Icon"
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-xl font-semibold text-primary mt-4">
            1. Browse Courses
          </h3>
          <p className="text-gray-600 mt-2">
            Search and explore a wide variety of courses that match your
            interests and goals.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary p-4 rounded-full">
            <img
              src="/icons/select-course.svg"
              alt="Select Course Icon"
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-xl font-semibold text-primary mt-4">
            2. Select & Enroll
          </h3>
          <p className="text-gray-600 mt-2">
            Choose the course that fits your schedule and budget, and enroll
            easily online.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary p-4 rounded-full">
            <img
              src="/icons/learn-online.svg"
              alt="Learn Online Icon"
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-xl font-semibold text-primary mt-4">
            3. Learn & Grow
          </h3>
          <p className="text-gray-600 mt-2">
            Start learning at your own pace with expert instructors and gain new
            skills.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary p-4 rounded-full">
            <img
              src="/icons/certificate.svg"
              alt="Certificate Icon"
              className="w-12 h-12"
            />
          </div>
          <h3 className="text-xl font-semibold text-primary mt-4">
            4. Get Certified
          </h3>
          <p className="text-gray-600 mt-2">
            Upon completion, earn a certificate to showcase your achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowMyCourses;
