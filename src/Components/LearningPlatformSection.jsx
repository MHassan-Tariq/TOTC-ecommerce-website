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

const LearningPlatformSection = () => {
  return (
    <section className="w-full bg-[#EAF3FF]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12 lg:py-14">
        <HeroLearningSection />
      </div>
    </section>
  );
};

export default LearningPlatformSection;


