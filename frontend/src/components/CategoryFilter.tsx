import { useState } from "react";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  title: string;
};
const CategoryFilter= ({
  categories,
  selectedCategory,
  onCategorySelect,
  title,
}:CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const handleCategoryClick = (category:string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 lg:w-64 w-[100%] shadow-sm h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={`${category}-${index}`}
            onClick={() => handleCategoryClick(category)}
            className={`
              w-full text-left px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer
              ${
                activeCategory === category
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "text-gray-700 hover:bg-gray-100 border border-transparent"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {activeCategory && (
        <button
          onClick={() => handleCategoryClick(activeCategory)}
          className="w-full mt-4 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default CategoryFilter;
