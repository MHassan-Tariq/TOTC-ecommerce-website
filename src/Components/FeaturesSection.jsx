import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2e3a59]">
            Our
            {" "}
            <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            This very extraordinary feature, can make learning activities more efficient
          </p>
        </motion.div>

        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-16">
          {/* Left image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Decorative shapes */}
            <div className="absolute -top-6 -left-4 w-14 h-14 bg-teal-300/40 rounded-full" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-400/30 rounded-full" />
            <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-orange-400/60 rounded-full" />

            <img
              src="/img/h12.png"
              alt="Classroom interface"
              className="w-full h-auto rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#2e3a59]">
              A <span className="text-teal-500">user interface</span> designed
              for the classroom
            </h3>

            {/* Bullet 1 */}
            <div className="flex items-start gap-3 mt-6">
              <span className="bg-teal-50 p-2 rounded-lg shadow-sm">
                <img src="/img/Vector.png" alt="icon" className="h-4 w-4" />
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                Teachers don’t get lost in the grid view and have a dedicated Podium space.
              </p>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-start gap-3 mt-4">
              <span className="bg-teal-50 p-2 rounded-lg shadow-sm">
                <img src="/img/document.png" alt="icon" className="h-4 w-4" />
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                TA’s and presenters can be moved to the front of the class.
              </p>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-start gap-3 mt-4">
              <span className="bg-teal-50 p-2 rounded-lg shadow-sm">
                <img src="/img/calander.png" alt="icon" className="h-4 w-4" />
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                Teachers can easily see all students and class data at one time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left text */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 md:order-1"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#2e3a59]">
              <span className="text-teal-500">Tools</span> For Teachers
              And Learners
            </h3>
            <p className="text-gray-500 mt-4 max-w-md text-sm leading-relaxed">
              Class has a dynamic set of teaching tools built to be deployed and used during
              class. Teachers can handout assignments in real-time for students to complete and
              submit.
            </p>
          </motion.div>

          {/* Right image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative order-1 md:order-2"
          >
            {/* playful shapes */}
            <div className="absolute -top-2 left-1/4 w-3 h-3 bg-teal-400 rounded-full" />
            <div className="absolute -top-4 right-10 w-2.5 h-2.5 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-3 right-6 w-3 h-3 bg-orange-400 rounded-full" />

            <img
              src="/img/h11.png"
              alt="Student with books"
              className="relative z-10 w-full h-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


