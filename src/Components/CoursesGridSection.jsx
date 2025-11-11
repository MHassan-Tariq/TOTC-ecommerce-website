import React from "react";
import { Link } from "react-router-dom";

const CoursesGridSection = () => {
  const courses = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    category: "Design",
    duration: "3 Month",
    title: "AWS Certified solutions Architect",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    img: [
      "/img/h4.jpg",   // girl studying
      "/img/h5.jpg",   // keyboard close-up
      "/img/b3.jpg",   // laptop on desk
      "/img/h8.png",   // workspace hands
      "/img/h3.png",   // alt workspace
      "/img/h2.png",   // alt device
      "/img/h7.png",   // typing hands
      "/img/h6.png",   // laptop dark
    ][i % 8],
    instructor: {
      name: "Lina",
      avatar: "/img/profilephoto.png",
    },
    price: { old: "$100", current: "$80" },
  }));

  return (
    <section
      className="w-full bg-[#F1F7FD]"
      aria-label="Courses"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-14 lg:py-16">
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <div>
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-[#1E2B4A]">
              Recommended for you
            </h2>
          </div>
          <Link to="/courses" className="text-sky-500 text-sm hover:underline">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <article
              key={c.id}
              className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col"
            >
              <div className="relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-44 w-full object-cover md:h-40 lg:h-44"
                />
              </div>

              <div className="flex grow flex-col px-5 pb-5 pt-4">
                <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <img src="/img/Group.png" alt="" className="h-3 w-3" />
                    {c.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src="/img/calander.png" alt="" className="h-3 w-3" />
                    {c.duration}
                  </span>
                </div>

                <h3 className="text-[15px] font-semibold leading-snug text-[#1E2B4A] md:text-base">
                  {c.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {c.desc}
                </p>

                <div className="grow" />

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={c.instructor.avatar}
                      alt={c.instructor.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">{c.instructor.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400 line-through">{c.price.old}</span>
                    <span className="font-semibold text-emerald-500">{c.price.current}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGridSection;


