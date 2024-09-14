import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCourses from "./data/courses.json";
import arCourses from "./data/arCourses.json";
i18n
  .use(LanguageDetector) // لكشف لغة المتصفح تلقائيًا
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enCourses,
          navbar: {
            home: "Home",
            timing: "Timing Courses",
            contact: "Contact Us",
            courses: "Courses",
            categories: "Categories",
          },
          home: {
            searching: "Searching the Course",
            app: "App Coming Courses",
            search: "Search",
            alllocations: "All Locations",
            allcategories: "All Categories",
            searchby: "Search by title...",
          },
          courses: {
            title: "Our Courses",
            upcomingCourses: "Upcoming Courses",
            courseDetails: "Course Details",
          },
          footer: {
            address: "Location: 1234 Street Name, City, Country",
            phone: "Phone: +123 456 7890",
            email: "Email: contact@yourcompany.com",
            copyright: "© 2024 Your Company. All rights reserved.",
            links: {
              home: "Home",
              about: "About Us",
              contact: "Contact Us",
              courses: "Courses",
              appComingCourses: "App Coming Courses",
            },
          },
        },
      },
      ar: {
        translation: {
          ...arCourses,
          navbar: {
            home: "الرئيسية",
            about: "من نحن",
            contact: "اتصل بنا",
            courses: "الدورات",
          },
          footer: {
            address: "الموقع: 1234 اسم الشارع، المدينة، البلد",
            phone: "الهاتف: +123 456 7890",
            email: "البريد الإلكتروني: contact@yourcompany.com",
            copyright: "© 2024 شركتك. جميع الحقوق محفوظة.",
            links: {
              home: "الرئيسية",
              about: "من نحن",
              contact: "اتصل بنا",
              courses: "الدورات",
              appComingCourses: "الدورات القادمة",
            },
          },
          home: {
            welcome: "مرحبًا بك في منصتنا",
            learnMore: "اعرف المزيد",
          },
          courses: {
            title: "دوراتنا",
            upcomingCourses: "الدورات القادمة",
            courseDetails: "تفاصيل الدورة",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
