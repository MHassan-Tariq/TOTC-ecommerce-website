import React from "react";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-teal-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.89a.75.75 0 0 1 .03 1.06l-4.5 5a.75.75 0 0 1-1.09.02l-2-2a.75.75 0 1 1 1.06-1.06l1.44 1.44 3.97-4.41a.75.75 0 0 1 1.09-.04Z" clipRule="evenodd" />
  </svg>
);

const Feature = ({ children }) => (
  <li className="flex items-center gap-2 text-sm text-gray-600">
    <CheckIcon />
    <span>{children}</span>
  </li>
);

const Card = ({ label, sublabel, price, period, features, cta, highlight }) => (
  <div className={`relative rounded-xl bg-white ${highlight ? "shadow-xl ring-1 ring-teal-200" : "shadow-md"} hover:shadow-xl transition-all duration-300 flex flex-col h-full`}>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold text-teal-600">{label}</p>
        {highlight && (
          <span className="text-[10px] font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">BEST</span>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-4">{sublabel}</p>
      <div className="flex items-end gap-1 mb-5">
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        <span className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">{period}</span>
      </div>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <Feature key={i}>{f}</Feature>
        ))}
      </ul>
    </div>
    <div className="px-6 pb-6 mt-auto">
      <button
        className={`w-full rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 ${highlight ? "bg-[#23A7F1] text-white hover:brightness-110" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
      >
        {cta}
      </button>
    </div>
  </div>
);

const PricingSection = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E2B4A] text-center mb-10">Affordable pricing</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <Card
            label="Like a prosky"
            sublabel="FREE / FOREVER"
            price="Free"
            period="forever"
            cta="Try for free"
            features={[
              "Components-driven system",
              "Sales-boosting landing pages",
              "Awesome Feather icons pack",
              "Themed in 3 different styles",
            ]}
          />

          <Card
            label="Individual"
            sublabel="BEST"
            price="$24"
            period="/ month"
            cta="Regular license"
            highlight
            features={[
              "Components-driven system",
              "Sales-boosting landing pages",
              "Awesome Feather icons pack",
              "Themed in 3 different styles",
              "Will help to learn Figma",
            ]}
          />

          <Card
            label="Corporate"
            sublabel="$12 / MONTH"
            price="$12"
            period="/ month"
            cta="Extended license"
            features={[
              "Components-driven system",
              "Sales-boosting landing pages",
              "Awesome Feather icons pack",
              "Themed in 3 different styles",
            ]}
          />
        </div>

        {/* CTA banner */}
        <div className="mt-14">
          <div className="rounded-2xl bg-[#1E2B4A] text-white px-6 py-10 md:px-12 md:py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg md:text-xl font-semibold mb-3">Online coaching lessons for remote learning.</h3>
              <p className="text-white/80 text-sm md:text-base mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor</p>
              <button className="inline-flex items-center justify-center rounded-md bg-teal-400 text-white text-sm font-semibold px-5 py-2.5 hover:brightness-105 transition-all duration-300">Start learning now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;


