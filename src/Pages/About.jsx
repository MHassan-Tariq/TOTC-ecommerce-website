import React from "react";
import Navbar from "../Components/Navbar.jsx";
import FooterSection from "../Components/FooterSection.jsx";
import { Target, UsersRound, Globe2, Award, HeartHandshake, GraduationCap } from "lucide-react";

const stats = [
  { label: "Learners served", value: "120K+" },
  { label: "Countries represented", value: "45" },
  { label: "Expert mentors", value: "350+" },
  { label: "Course satisfaction", value: "97%" },
];

const values = [
  {
    title: "Learning with purpose",
    description: "We build every program alongside industry leaders so learners graduate with skills that matter today and tomorrow.",
    icon: Target,
  },
  {
    title: "Community first",
    description: "Our mentors, alumni, and coaching circles ensure no learner advances alone—there is always a hand to guide the next step.",
    icon: UsersRound,
  },
  {
    title: "Global by design",
    description: "Flexible cohorts, multilingual content, and culturally-aware coaches make our classrooms inclusive for learners everywhere.",
    icon: Globe2,
  },
  {
    title: "Excellence in execution",
    description: "From admission to graduation, every workflow is measured so we can deliver a polished, delightful experience at scale.",
    icon: Award,
  },
];

const leaders = [
  {
    name: "Amina Patel",
    role: "Chief Learning Officer",
    bio: "Former university dean who now champions project-based education for modern teams.",
    avatar: "/img/team1.jpg",
  },
  {
    name: "Liam Chen",
    role: "VP, Mentor Experience",
    bio: "Builds global mentor networks and ensures every learner receives actionable feedback.",
    avatar: "/img/team2.jpg",
  },
  {
    name: "Sofia Martins",
    role: "Head of Product",
    bio: "Leads the platform experience, focusing on accessibility, analytics, and learner delight.",
    avatar: "/img/team3.jpg",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Navbar variant="dark" />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E6FBFF] via-white to-[#F8F5FF]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
                About TOTC
              </span>
              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                We unlock premium learning pathways for ambitious teams and visionary individuals.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl">
                TOTC is a global learning studio. We partner with companies and subject experts to design programs that combine flexible content, mentorship, and real-world projects. Our goal: help more people do work they love.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/courses"
                  className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 transition hover:bg-emerald-600"
                >
                  Explore our courses
                </a>
                <a
                  href="/meeting"
                  className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Book a discovery call
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-emerald-100 blur-3xl opacity-60" />
              <div className="relative rounded-3xl bg-white shadow-2xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                    <HeartHandshake className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Partners in learning</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      We align with your goals, whether you are launching a new academy, reskilling a team, or preparing for your dream role.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10">
                    <GraduationCap className="h-6 w-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Mentors who walk the talk</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Every cohort is supported by practitioners actively shipping products, campaigns, and services across the globe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission + Values */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Our mission</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                We believe learning should be flexible, human, and outcome-driven. Instead of passive lectures, we orchestrate immersive experiences that connect learners with mentors, peers, and projects. The result is tangible growth not just certificates.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Every program is built on three pillars: rigorous content, purposeful practice, and ongoing coaching. Together, they help individuals and teams stay ready for the opportunities of tomorrow.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <value.icon className="h-6 w-6 text-emerald-500" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Leadership you can trust</h2>
              <p className="mt-3 text-base text-gray-600 max-w-xl">
                Our leadership team blends experience in higher education, SaaS, design, and people development. Together they create the frameworks that help learners thrive.
              </p>
            </div>
            <a
              href="/meeting"
              className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-gray-800"
            >
              Meet with us
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <div key={leader.name} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/img/profilephoto.png";
                    }}
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{leader.name}</h3>
                  <p className="text-sm font-medium text-emerald-600">{leader.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-white to-sky-100 opacity-70" />
          <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Ready to build your next cohort or level up your team?
            </h2>
            <p className="text-base text-gray-600">
              Partner with TOTC to craft a learning journey that is personal, measurable, and aligned with your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/courses"
                className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600"
              >
                Start exploring courses
              </a>
              <a
                href="mailto:partnerships@totc.com"
                className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                partnerships@totc.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default About;
