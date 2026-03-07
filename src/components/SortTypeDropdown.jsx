import { useState } from 'react';

const SORT_TYPES = [
  { label: '최신순', value: 'CREATED_DATE' },
  { label: '인기순', value: 'SCORE' },
  { label: '추천순', value: 'LIKES' },
  { label: '조회순', value: 'VIEW' },
];

function SortTypeDropdown({ sortType, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const current = SORT_TYPES.find((t) => t.value === sortType) || SORT_TYPES[0];

  const handleClick = (type) => {
    onSelect(type.value);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {current.label}
        <svg className="w-2 h-2 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className="absolute top-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-28"
      >
        <ul className="py-2 text-sm text-gray-700">
          {SORT_TYPES.map((type) => (
            <li key={type.value}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                onClick={() => handleClick(type)}
              >
                {type.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortTypeDropdown;