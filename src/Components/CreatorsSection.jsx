import React from "react";

const people = [
  { id: 1, name: "Jane Cooper", img: "/img/h19.png" },
  { id: 2, name: "Adam", img: "/img/h17.png" },
  { id: 3, name: "Tamara", img: "/img/h16.png" },
  { id: 4, name: "Jane Cooper", img: "/img/h18.png" },
  { id: 5, name: "Jane Cooper", img: "/img/h20.png" },
  { id: 6, name: "Jane Cooper", img: "/img/h21.png" },
];

const CreatorsSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#1C1C1C]">
            Classes taught by real creators
          </h2>
          <a href="#" className="text-teal-600 text-sm hover:underline">See all</a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => (
            <article key={p.id} className="rounded-2xl bg-white shadow-md shadow-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="px-6 pt-6">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-xl">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 text-center">
                <h3 className="text-sm font-semibold text-[#1C1C1C]">{p.name}</h3>
                <p className="mt-2 text-xs text-[#6B7280]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;


