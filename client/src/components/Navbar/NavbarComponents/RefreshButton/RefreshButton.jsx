import React, { useState } from 'react';

function RefreshButton() {
  const [isSpinning, setIsSpinning] = useState(false);
  const onRefresh = () => {
    setIsSpinning(true);
    window.location.reload();
  };
  return (
    <div className="flex mx-auto xl:hidden">
      <button type="button" onClick={() => onRefresh()} className={`${isSpinning === 'true' && 'spinner'} fade-in text-center bg-black rounded-full px-2 py-2 border-white border text-white`}>
        <svg className="h-6" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default RefreshButton;
