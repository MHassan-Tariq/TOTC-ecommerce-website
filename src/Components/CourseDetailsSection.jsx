import React from 'react'

const ProgressRow = ({ label }) => (
  <div className="flex items-center gap-3">
    <span className="w-10 text-xs text-gray-500">{label}</span>
    <div className="flex-1 h-2 rounded-full bg-gray-200">
      <div className="h-2 rounded-full bg-[#2EBAC6] w-[85%]" />
    </div>
  </div>
)

const ReviewItem = ({ avatar, name, time, text }) => (
  <div className="py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <div className="text-sm font-medium text-[#1E2B4A]">{name}</div>
          <div className="text-amber-400 text-xs">★★★★★</div>
        </div>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{text}</p>
    <div className="mt-4 h-px bg-gray-200" />
  </div>
)

const CourseDetailsSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-[#E8F3FF] p-6 md:p-8">
              {/* Rating summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <div className="bg-white rounded-lg shadow-sm p-4 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-sm text-gray-600">4 out of 5</div>
                  <div className="mt-1 text-amber-400">★★★★★</div>
                  <div className="mt-2 text-xs text-gray-500">Top Raiting</div>
                </div>
                <div className="md:col-span-2 space-y-3">
                  {['5 Stars','4 Stars','3 Stars','2 Stars','1 Stars'].map((s, i) => (
                    <ProgressRow key={i} label={s} />
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <ReviewItem
                  avatar="/img/profilephoto.png"
                  name="Lina"
                  time="3 Month"
                  text="Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively..."
                />
                <ReviewItem
                  avatar="/img/profilephoto.png"
                  name="Lina"
                  time="3 Month"
                  text="Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively..."
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-white p-6 md:p-8">
              <h3 className="text-[#1E2B4A] font-semibold">This Course included</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                {[
                  'Money Back Guarantee',
                  'Access on all devices',
                  'Certificate of completion',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#2EBAC6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="text-[#1E2B4A] font-semibold">Training 5 or more people</h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Class, launched less than a year ago by Blackboard co-founder Michael Chasen,
                  integrates exclusively...
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-[#1E2B4A] font-semibold">Share this course</h4>
                <div className="mt-3 flex items-center gap-3 text-[#1E2B4A]">
                  {['/img/twitter.png','/img/Group 71.png','/img/Group 72.png','/img/Group 73.png','/img/Group 236.png'].map((src, i) => (
                    <span key={i} className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <img src={src} alt="social" className="w-4 h-4 object-contain" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseDetailsSection


