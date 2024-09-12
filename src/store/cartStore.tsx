import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Course } from "../types";

// تعريف نوع CartState
interface CartState {
  courses: { course: Course; quantity: number }[];
  addCourse: (course: Course) => void;
  incrementQuantity: (courseId: number) => void;
  decrementQuantity: (courseId: number) => void;
  removeCourse: (courseId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCourses: () => number;
}

type MyPersist = (
  config: StateCreator<CartState>,
  options: PersistOptions<CartState>
) => StateCreator<CartState>;

export const useCartStore = create<CartState>(
  (persist as MyPersist)(
    (set, get) => ({
      courses: [],
      addCourse: (course) =>
        set((state) => {
          const existingCourse = state.courses.find(
            (c) => c.course.id === course.id
          );
          if (existingCourse) {
            return {
              courses: state.courses.map((c) =>
                c.course.id === course.id
                  ? { ...c, quantity: c.quantity + 1 }
                  : c
              ),
            };
          } else {
            return {
              courses: [...state.courses, { course, quantity: 1 }],
            };
          }
        }),
      incrementQuantity: (courseId) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.course.id === courseId ? { ...c, quantity: c.quantity + 1 } : c
          ),
        })),
      decrementQuantity: (courseId) =>
        set((state) => ({
          courses: state.courses
            .map((c) =>
              c.course.id === courseId && { ...c, quantity: c.quantity > 0 }
                ? { ...c, quantity: c.quantity - 1 }
                : c
            )
            .filter((c) => c.quantity > 0),
        })),
      removeCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.course.id !== courseId),
        })),
      clearCart: () =>
        set(() => ({
          courses: [],
        })),
      getTotalPrice: () =>
        get().courses.reduce(
          (total, c) => total + (c.course.price ?? 0) * c.quantity,
          0
        ),
      getTotalCourses: () => get().courses.length,
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);
