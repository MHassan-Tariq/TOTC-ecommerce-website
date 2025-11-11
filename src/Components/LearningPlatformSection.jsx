import React from "react";
import { Link } from "react-router-dom";

const HeroLearningSection = () => {
  const avatars = ["/img/h14.png", "/img/h17.png", "/img/h16.png", "/img/h18.png", "/img/h19.png"]; // includes Adam image

  return (
    <div className="rounded-3xl bg-blue-50 shadow-md p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-[22px] md:text-[24px] font-bold text-[#1E2B4A]">
            Know about learning platform
          </h2>
          <ul className="mt-5 space-y-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
              <span>Free E-book, video & consultation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
              <span>Top instructors from around world</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
              <span>Top courses from your team</span>
            </li>
          </ul>

          <button className="mt-6 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Start learning now
          </button>
        </div>

        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-3">
            {avatars.slice(0, 4).map((src, i) => (
              <div key={i} className="col-span-1">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <img src={src} alt="participant" className="h-24 w-full object-cover" />
                </div>
                <div className="mt-1 text-center text-[11px] text-gray-600">Alex</div>
              </div>
            ))}
            <div className="col-span-2">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <img src="/img/h15.png" alt="host" className="h-24 w-full object-cover" />
              </div>
              <div className="mt-1 text-center text-[11px] text-gray-600">Patricia</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button className="rounded-full bg-blue-500 px-4 py-2 text-white text-sm shadow hover:opacity-90">
              Pres
            </button>
            <button className="rounded-full bg-pink-500 px-4 py-2 text-white text-sm shadow hover:opacity-90">
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecommendedCourses = () => {
  const courses = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    img: [
      "/img/h4.jpg", // student with laptop
      "/img/h5.jpg", // hands on keyboard
      "/img/b3.jpg", // laptop screen
      "/img/h4.jpg", // workspace
    ][i % 4],
    title: "AWS Certified Solutions Architect",
    category: "Design",
    duration: "3 Month",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    instructor: { name: "Lina", avatar: "/img/profilephoto.png" },
    priceOld: "$100",
    priceNew: "$80",
  }));

  return (
    <div className="mt-10 md:mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg md:text-2xl font-bold text-[#1E2B4A]">
          Recommended for you
        </h3>
        <Link to="/courses" className="text-sky-500 text-sm hover:underline">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <article
            key={c.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
          >
            <img src={c.img} alt={c.title} className="h-44 w-full object-cover" />

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

              <h4 className="text-[15px] md:text-base font-semibold text-[#1E2B4A]">
                {c.title}
              </h4>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{c.desc}</p>

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
                  <span className="text-gray-400 line-through">{c.priceOld}</span>
                  <span className="font-semibold text-emerald-500">{c.priceNew}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const LearningPlatformSection = () => {
  return (
    <section className="w-full bg-[#EAF3FF]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12 lg:py-14">
        <HeroLearningSection />
        <RecommendedCourses />
      </div>
    </section>
  );
};

export default LearningPlatformSection;


