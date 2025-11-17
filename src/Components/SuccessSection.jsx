import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, CalendarClock, UsersRound } from "lucide-react";

const stats = [
  { value: "15K+", label: "Students" },
  { value: "75%", label: "Total success" },
  { value: "35", label: "Main questions" },
  { value: "26", label: "Chief experts" },
  { value: "16", label: "Years of experience" },
];

const cards = [
  {
    icon: FileSpreadsheet,
    iconTone: "text-blue-600",
    title: "Online Billing, Invoicing, & Contracts",
    text:
      "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts.",
    badge: "bg-blue-100/70",
  },
  {
    icon: CalendarClock,
    iconTone: "text-emerald-600",
    title: "Easy Scheduling & Attendance Tracking",
    text:
      "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.",
    badge: "bg-green-100/70",
  },
  {
    icon: UsersRound,
    iconTone: "text-rose-600",
    title: "Customer Tracking",
    text:
      "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization.",
    badge: "bg-rose-100/70",
  },
];

const SuccessSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Heading + Subtitle */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black">Our Success</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-2 text-sm md:text-base">
            From first enrollment to thriving alumni, TOTC learners keep exceeding expectations. Our platform powers real growth with measurable outcomes across every program we offer.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <div className="text-4xl md:text-5xl font-light text-[#00b8b0]">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Middle: Subheading */}
        <div className="mt-28 md:mt-32 py-10 md:py-12 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-black">
            All-In-One {" "}
            <span className="bg-gradient-to-r from-teal-500 to-green-400 bg-clip-text text-transparent">
              Cloud Software.
            </span>
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            TOTC is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-10 md:p-12 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-h-[360px] md:min-h-[400px]"
            >
              <div className={`mx-auto h-14 w-14 rounded-full ${c.badge} grid place-items-center`}>
                <Icon className={`h-7 w-7 ${c.iconTone}`} strokeWidth={1.75} />
              </div>
              <h4 className="text-[#2e3a59] text-lg font-semibold mt-4 mb-2">
                {c.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {c.text}
              </p>
            </motion.div>
          );})}
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;



