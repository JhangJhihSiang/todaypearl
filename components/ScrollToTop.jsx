// components/BackToTop.js

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // 你可以使用任何 icon

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 點擊回到頂部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
