import React, { useState } from "react";

const Filter = ({ text, onFilterSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index, path) => {
    setActiveIndex(index);
    if (onFilterSelect) {
      onFilterSelect(path);
    }
  };

  return (
    <div className="mt-10 flex">
      <div className="flex gap-5 mx-auto lg:justify-center overflow-x-auto lg:overflow-x-hidden">
        {text.map((item, index) => (
          <div key={item.id} className="p-4 lg:p-2 ">
            <button
              className={`text-md font-semibold ${
                index === activeIndex
                  ? "text-black border-b-4 border-blue-500 border-blue-500 w-min"
                  : "text-gray-500"
              } transition-all duration-200`}
              onClick={() => handleClick(index, item.path)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
