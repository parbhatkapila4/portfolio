"use client";

const companies = ["Spotify", "Gumroad", "asana", "Framer", "Medium", "Linear"];

const TopBar = () => {
  return (
    <div className="w-full py-3 md:py-4 border-b border-gray-800 bg-black">
      <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap overflow-x-auto">
        {companies.map((company, index) => (
          <span
            key={index}
            className="text-gray-500 text-xs md:text-sm font-medium hover:text-gray-400 transition-colors whitespace-nowrap"
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
