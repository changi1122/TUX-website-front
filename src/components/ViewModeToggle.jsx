const VIEW_MODES = {
  list: {
    label: '목록',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
      </svg>
    ),
  },
  detail: {
    label: '자세히',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
      </svg>
    ),
  },
  gallery: {
    label: '갤러리',
    icon: (
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
      </svg>
    ),
  },
};

function ViewModeToggle({ modes = ['list', 'detail'], viewMode, onChange }) {
  return (
    <div className="flex justify-end mt-4 gap-1">
      {modes.map((mode) => {
        const { label, icon } = VIEW_MODES[mode];
        const isActive = viewMode === mode;
        return (
          <button
            key={mode}
            type="button"
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border ${
              isActive
                ? 'bg-gray-500 text-white border-gray-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => onChange(mode)}
            title={label}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}

export default ViewModeToggle;
