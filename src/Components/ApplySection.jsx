import React from "react";

const ApplyCard = ({ imageSrc, title, description, cta }) => (
  <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
    <img src={imageSrc} alt={title} className="w-full h-44 object-cover rounded-t-2xl" />
    <div className="p-5">
      <h3 className="text-gray-800 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex justify-end">
        <button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 transition-colors">
          {cta}
        </button>
      </div>
    </div>
  </article>
);

const ApplySection = () => {
  const desc =
    "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively…";

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ApplyCard
            imageSrc="/img/h4.jpg"
            title="Become a Teacher"
            description={desc}
            cta="Apply a Teacher"
          />
          <ApplyCard
            imageSrc="/img/h5.jpg"
            title="Become a Coursector"
            description={desc}
            cta="Apply a Coursector"
          />
        </div>
      </div>
    </section>
  );
};

export default ApplySection;


