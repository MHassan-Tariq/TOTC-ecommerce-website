import React from "react";

const sideAvatars = [
  { src: "/img/h17.png", alt: "Adam" },
  { src: "/img/h18.png", alt: "Patricia" },
  { src: "/img/h16.png", alt: "Tamara" },
  { src: "/img/h14.png", alt: "Jane" },
];

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-[#EAF3FF]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="sr-only">What our students have to say</h2>

        <div className="rounded-2xl bg-[#EAF3FB] p-6 md:p-8 shadow-md shadow-gray-100">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center">
            {/* Left: student image with abstract shapes */}
            <div className="md:col-span-2">
              <div className="relative mx-auto w-64 md:w-72">
                <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-emerald-200/60" />
                <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-pink-200/60" />
                <div className="relative z-10 overflow-hidden rounded-full bg-white p-2 shadow">
                  <img src="/img/h20.png" alt="Student" className="h-64 w-64 rounded-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right: testimonial content */}
            <div className="md:col-span-3">
              <h3 className="text-base md:text-lg font-semibold text-[#1C1C1C]">Savannah Nguyen</h3>
              <p className="text-xs md:text-sm text-gray-500">tanya.hill@example.com</p>

              <div className="mt-4 space-y-2 text-xs md:text-sm text-[#6B7280]">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, sed do eiusmod tempor</p>
              </div>

              {/* Social icons */}
              <div className="mt-5 flex items-center gap-3 text-sky-500">
                <a href="#" aria-label="Twitter" className="hover:opacity-80">
                  <img src="/img/twitter.png" alt="Twitter" className="h-5 w-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
                  <img src="/img/Group 368.png" alt="LinkedIn" className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:opacity-80">
                  <img src="/img/Group 416.png" alt="Instagram" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right edge stacked avatars */}
          <div className="mt-6 flex items-center justify-end gap-3">
            {sideAvatars.map((p, i) => (
              <img key={i} src={p.src} alt={p.alt} className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


