import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {

  const[isVisible, setIsVisible] = useState(false)



//   Show Button When Page Is Scrolled Upto Given Distance

  const toggleVisibility = () => {
    if(window.scrollY > 300){
        setIsVisible(true)

    }else{
        setIsVisible(false)
    }
  }



//   Set The Top Cordinate To 0 & Make Scrolling Smooth

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior:'smooth'})
  }



  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])



  return (isVisible &&

    <div className='flex justify-center items-center w-12 h-12 bg-transparent fixed bottom-2 right-2 cursor-pointer' onClick={scrollToTop}>


            <div className='bg-transparent' onClick={scrollToTop}>

                <p>⬆️</p>

            </div>
        
      
    </div>
  )
}

export default ScrollToTop
