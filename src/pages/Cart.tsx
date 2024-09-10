// src/pages/Cart.tsx

import { FC } from "react";
import { useCartStore } from "../store/cartStore";
import SEO from "../components/SEO";
import { toast } from "react-toastify";

const Cart: FC = () => {
  const {
    courses,
    incrementQuantity,
    decrementQuantity,
    removeCourse,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  return (
    <main className="container mt-16 mx-auto py-8 px-6">
      <SEO
        title="Your Cart - Review and Manage Your Selected Courses"
        description="Review the courses you have added to your cart. Adjust quantities, remove items, or proceed to checkout. Manage your selected courses easily."
        keywords="cart, shopping cart, manage courses, checkout, course cart"
        author="Hasan Shamaa"
      />
      <h1 className="text-4xl font-bold mb-6 text-center">Cart Page</h1>
      <div className="p-4 rounded-lg mb-8">
        {courses.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty</p>
        ) : (
          <div>
            {courses.map(({ course, quantity }) => (
              <div
                key={course.id}
                className="flex flex-col md:flex-row items-center border p-4 rounded-lg mb-4"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full md:w-40 h-32 md:h-40 object-cover mb-4 md:mb-0 md:mr-4 rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-gray-700">Price: ${course.price}</p>
                  <p className="text-gray-700">Date: {course.date}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decrementQuantity(course.id)}
                      className="bg-secondary text-white px-2 py-1 rounded-md mr-2"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity}</span>
                    <button
                      onClick={() => incrementQuantity(course.id)}
                      className="bg-secondary text-white px-2 py-1 rounded-md ml-2"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeCourse(course.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0 md:ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-4">
              <h2 className="text-xl font-semibold">
                Total Price: ${getTotalPrice()}
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Clear Cart
              </button>
              <button
                onClick={() => {
                  toast.success("Submit complete !!", {
                    position: "bottom-right",
                  });
                }}
                className="bg-primary text-white px-4 py-2 rounded-md mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
