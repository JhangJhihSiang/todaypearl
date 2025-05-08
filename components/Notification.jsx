import React, { useEffect } from 'react';


// 出現在畫面正中間的通知

const Notification = ({ message, onClose }) => {


  useEffect(() => {


    // 在 5 秒後執行 onClose ，也就是關掉通知

    const timer = setTimeout(() => {

      onClose();

    }, 5000);


    // 清除計時器

    return () => clearTimeout(timer);


  }, [message, onClose]);



  return (


    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-2xl">


      {message}


    </div>

  );
};



export default Notification;
