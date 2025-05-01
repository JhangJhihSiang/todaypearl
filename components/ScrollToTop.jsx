import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {

  const [isVisible, setIsVisible] = useState(false);


  // 監聽滾動事件
  // Ｙ軸滾動超過300像素時出現

  useEffect(() => {

    const toggleVisibility = () => {

      if (window.scrollY > 300) {

        setIsVisible(true);

      } else {

        setIsVisible(false);

      }
    };


    // 監聽事件：當使用者滾動整個視窗時，自動呼叫 toggleVisibility 這個函式。」

    window.addEventListener('scroll', toggleVisibility);

    return () => {


      // 結束監聽事件

      window.removeEventListener('scroll', toggleVisibility);

    };

  }, []);




  // 點擊回到頂部，過程平滑

  const scrollToTop = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  return (

    <>

      {isVisible && (

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        >

          <FaArrowUp size={20} />

        </button>

      )}

    </>

  );
};

export default ScrollToTop;
