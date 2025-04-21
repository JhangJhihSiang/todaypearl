import { assets } from '@/assets/assets';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState} from 'react'


const ProductItem = ({id, image, name, price}) => {



  const {currency, addToCart} = useContext(ShopContext);

  const [isHovered, setIsHovered] = useState(false)

  



  return (
    
    <div>

        <Link href={`/product/${id}`} className='text-gray-700 cursor-pointer overflow-hidden'>

            <Image
              width={300}
              height={300}
              src={image[0]} 
              className='w-full hover:scale-105 transition ease-in-out rounded-lg' 
              alt="image" 
            />

            </Link>

<div className='flex justify-between items-center'>


            <div className='mt-1'>

                <p className='pt-3 pb-1 text-sm'>{name}</p>

                <p className='text-sm font-medium'>{currency}{price}</p>


            </div>



            <div>

                <button 
                  onClick={()=>addToCart(id)} 
                  onMouseEnter={()=>setIsHovered(true)}
                  onMouseLeave={()=>setIsHovered(false)}
                  className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
                >

                    <Image 
                      src={isHovered? assets.heart_icon_red : assets.heart_icon} 
                      alt='heart_icon' 
                      width={10} 
                      height={10} 
                    />
                    
                </button>
            </div>
    </div>
</div>
  )
}

export default ProductItem
