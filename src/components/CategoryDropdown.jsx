import { useState } from 'react';

const BUTTON_CLASSES = {
  list: "flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100",
  form: "flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200",
};

function CategoryDropdown({ categories, category, onSelect, variant = 'list' }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (cat) => {
    onSelect(cat.label, cat.value, cat.color);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={BUTTON_CLASSES[variant]}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='w-2 h-[16px] mr-2 rounded-full' style={{ backgroundColor: category[2] }}></span>
        {category[0]}
        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className="absolute top-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
      >
        <ul className="py-2 text-sm text-gray-700">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => handleClick(cat)}
              >
                <span className='w-2 mr-2 rounded-full' style={{ backgroundColor: cat.color }}></span>
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryDropdown;
