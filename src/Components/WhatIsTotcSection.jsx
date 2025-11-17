import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";

const FALLBACK_INSTRUCTOR_IMAGE = "/img/h4.jpg";
const FALLBACK_STUDENT_IMAGE = "/img/h5.jpg";

const truncateText = (text, limit = 28) => {
  if (!text || typeof text !== "string") return "";
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
};

const MotionLink = motion(Link);

const WhatIsTotcSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        const courseList = Array.isArray(response?.courses)
          ? response.courses
          : Array.isArray(response)
            ? response
            : [];

        if (isMounted) {
          setCourses(courseList);
        }
      } catch (error) {
        console.error("Failed to load courses for WhatIsTotc section", error);
        if (isMounted) {
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const highlightCards = useMemo(() => {
    const baseCards = [
      {
        key: "instructors",
        defaultLabel: "FOR INSTRUCTORS",
        defaultCta: "Start a class today",
        fallbackImage: FALLBACK_INSTRUCTOR_IMAGE,
        fallbackLink: "/admin/courses",
      },
      {
        key: "students",
        defaultLabel: "FOR STUDENTS",
        defaultCta: "Enter access code",
        fallbackImage: FALLBACK_STUDENT_IMAGE,
        fallbackLink: "/courses",
      },
    ];

    if (!courses.length) {
      return baseCards.map((card) => ({
        ...card,
        image: card.fallbackImage,
        label: card.defaultLabel,
        cta: card.defaultCta,
        link: card.fallbackLink,
      }));
    }

    return baseCards.map((card, index) => {
      const course = courses[index] || courses[0];
      const resolvedImage = course?.imageUrl || course?.videoUrl || card.fallbackImage;

      const labelSource = course?.category?.trim() || card.defaultLabel;
      const ctaSource = course?.title?.trim() || card.defaultCta;

      return {
        ...card,
        image: resolvedImage,
        label: (card.key === "instructors" && labelSource === card.defaultLabel)
          ? card.defaultLabel
          : labelSource.toUpperCase(),
        cta: truncateText(ctaSource, 32) || card.defaultCta,
        link: course?._id ? `/course/${course._id}` : card.fallbackLink,
      };
    });
  }, [courses]);

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Title + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2e3a59]">
            What is
            {" "}
            <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              TOTC?
            </span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto mt-3 text-sm md:text-base">
            TOTC is a platform that allows educators to create online classes whereby they can
            store the course materials online; manage assignments, quizzes and exams; monitor due
            dates; grade results and provide students with feedback all in one place.
          </p>
        </motion.div>

        {/* Middle: Instructor / Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {highlightCards.map((card, index) => (
            <MotionLink
              key={card.key}
              to={card.link}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative rounded-2xl overflow-hidden group block h-[340px] md:h-[380px]"
            >
              <img
                src={card.image}
                alt={card.label}
                className={`absolute inset-0 h-full w-full object-cover ${loading ? "opacity-80" : ""}`}
                onError={(event) => {
                  event.currentTarget.src =
                    card.key === "instructors" ? FALLBACK_INSTRUCTOR_IMAGE : FALLBACK_STUDENT_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full py-0">
                <div className="text-white text-lg font-semibold tracking-wide">
                  {card.label}
                </div>
                <div
                  className={`mt-3 rounded-full px-5 py-2 text-sm font-medium shadow-md group-hover:scale-105 transition-all duration-500 ${
                    card.key === "students"
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-white/80 text-gray-800"
                  }`}
                >
                  {card.cta}
                </div>
              </div>
            </MotionLink>
          ))}
        </div>

        {/* Bottom: Classroom Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-20">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-[#2e3a59] leading-snug">
              Everything you can do in a physical classroom, {" "}
              <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                you can do with TOTC
              </span>
            </h3>
            <p className="text-gray-500 mt-4 max-w-md">
              TOTC’s school management software helps traditional and online schools manage
              scheduling, attendance, payments and virtual classrooms all in one secure cloud-based
              system.
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 underline mt-4 inline-block font-medium"
            >
              Learn more
            </a>
          </motion.div>

          {/* Right Image with play */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-teal-400 rounded-full z-10" />
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-teal-400 rounded-full z-10" />

            <img
              src="/img/h12.png"
              alt="Classroom"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute inset-0 m-auto h-12 w-12 grid place-items-center bg-white rounded-full shadow-lg text-teal-500 text-xl hover:scale-110 transition-all duration-300"
              aria-label="Play video"
            >
              ▶
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTotcSection;


