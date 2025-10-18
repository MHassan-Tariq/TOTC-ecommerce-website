import React from "react";

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const ArticleCard = ({ imageSrc }) => (
  <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
    <img src={imageSrc} alt="AWS Certified Solutions Architect" className="w-full h-48 object-cover" />
    <div className="p-5">
      <div className="flex justify-between items-center text-gray-400 text-xs font-medium mb-3">
        <div className="flex items-center gap-1">
          <TagIcon />
          <span>Design</span>
        </div>
        <span>3 Month</span>
      </div>
      <h3 className="text-[#1E2B4A] font-semibold text-[16px] leading-snug mb-2">
        AWS Certified solutions Architect
      </h3>
      <p className="text-gray-500 text-sm mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/img/profilephoto.png" alt="Author" className="w-8 h-8 rounded-full" />
          <p className="text-sm text-[#1E2B4A] font-medium">Lina</p>
        </div>
        <div className="text-sm font-semibold">
          <span className="text-gray-400 line-through mr-1">$100</span>
          <span className="text-[#20BFA9]">$80</span>
        </div>
      </div>
    </div>
  </article>
);

const MarketingArticles = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-10">
          <h2 className="text-[20px] md:text-[22px] font-semibold text-[#1E2B4A]">Marketing Articles</h2>
          <button className="text-[#20BFA9] font-medium text-sm hover:underline">See all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ArticleCard imageSrc="/img/h5.jpg" />
          <ArticleCard imageSrc="/img/h3.png" />
          <ArticleCard imageSrc="/img/h4.jpg" />
          <ArticleCard imageSrc="/img/h9.png" />
        </div>
      </div>
    </section>
  );
};

export default MarketingArticles;


