import React from 'react'
import { Clock, ChevronLeft } from 'lucide-react'

const lessonsLeft = [
  { id: 1, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-emerald-500' },
  { id: 2, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-amber-400' },
  { id: 3, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-sky-400' },
  { id: 4, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-rose-400' },
  { id: 5, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-indigo-400' },
  { id: 6, title: 'Lesson 01: Introduction about XD', duration: '30 mins', color: 'bg-teal-500' },
]

const quizItems = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: i,
  title: 'Lesson 01: Introduction about XD',
  duration: '30 mins',
  color: 'bg-rose-400',
}))

const days = Array.from({ length: 30 }, (_, i) => i + 1)

export default function CourseDetailSection() {
  return (
    <section className="min-h-screen bg-[#E9F1F9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-t-2xl bg-[#55C2C3] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Learn about Adobe XD & Prototyping</h1>
            <p className="text-white/90 text-sm mt-1">Introduction about XD</p>
          </div>
          <div className="text-sm flex items-center gap-2">
            <Clock size={16} />
            <span>1 hour</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <aside className="lg:col-span-1">
            <div className="rounded-b-2xl bg-white shadow-md p-4">
              <button className="inline-flex items-center gap-2 text-gray-600 text-sm mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200">
                  <ChevronLeft size={18} />
                </span>
                Back
              </button>

              <h3 className="text-sm font-semibold text-gray-900">Change Simplification</h3>
              <div className="mt-3 space-y-2">
                {lessonsLeft.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`h-3 w-3 rounded-sm ${l.color}`} />
                      <span className="truncate text-sm text-gray-800">{l.title}</span>
                    </div>
                    <span className="ml-3 whitespace-nowrap rounded-full bg-yellow-100 text-yellow-600 text-[10px] px-2 py-1">
                      {l.duration}
                    </span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm font-semibold text-gray-900">PRACTICE QUIZ</h3>
              <div className="mt-3 space-y-2">
                {quizItems.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`h-3 w-3 rounded-sm ${q.color}`} />
                      <span className="truncate text-sm text-gray-800">{q.title}</span>
                    </div>
                    <span className="ml-3 whitespace-nowrap rounded-full bg-yellow-100 text-yellow-600 text-[10px] px-2 py-1">
                      {q.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="rounded-b-2xl bg-white shadow-md p-6">
              <h3 className="text-base font-semibold text-gray-900">Share and refer</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-4xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipisicing elit, sed do eiusmodlorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipisicing elit, sed do eiusmodlorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodadipisicing elit, sed do eiusmod.
              </p>

              <div className="mt-6 rounded-xl border border-gray-100 p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="font-medium">September 2021</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent" />
                    </div>

                    <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                      {['S','M','T','W','T','F','S'].map((d) => (
                        <div key={d} className="py-1">{d}</div>
                      ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                      <div className="py-2" />
                      <div className="py-2" />
                      <div className="py-2" />
                      {days.map((d) => (
                        <div key={d} className={`py-2 rounded-md ${d === 12 ? 'bg-[#55C2C3] text-white font-semibold' : 'hover:bg-gray-50 text-gray-700'} transition`}>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 text-center md:text-left">Sep 12, Monday</div>
                    <div className="mt-4 space-y-4">
                      {[2,3,4,5,6].map((h) => (
                        <div key={h} className="flex items-start gap-3">
                          <div className="w-12 text-right text-xs text-gray-500">{h} PM</div>
                          <div className="flex-1 border-t border-gray-200 pt-2">
                            {h === 2 ? (
                              <div className="inline-block bg-pink-100 text-pink-700 rounded-md px-3 py-2 text-xs shadow-sm">
                                Adobe XD Live Class
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
