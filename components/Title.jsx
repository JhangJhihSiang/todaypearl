import React from 'react'

const Title = ({ text1, text2 }) => {
  // {text1, text2}：解構賦值，從父元件傳來的 props 中直接提取屬性，並賦值到變數中


  return (

    <div className='inline-flex gap-2 items-center mb-3'>


      {/* 文字 */}

      <p className='text-gray-500'>

        {text1}

        <span className='text-gray-700 font-medium'>{text2}</span>

      </p>


      {/* 橫線 */}

      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>


    </div>
  )
}

export default Title
