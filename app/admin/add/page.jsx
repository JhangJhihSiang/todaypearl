'use client'

import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { admin_assets } from '@/assets/admin_assets'
import { ShopContext } from '@/context/ShopContext'

const Add = () => {
  

  const {token} = useContext(ShopContext)


  const [files, setFiles] = useState([])

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');

  const [category, setCategory] = useState('戒指');

  const [bestseller, setBestseller] = useState(false);



  const onSubmitHandler = async (e) => {

    e.preventDefault();


    const formData = new FormData()

    formData.append("name", name)

    formData.append("description", description)

    formData.append("price", price)

    formData.append("category", category)

    formData.append("bestseller", bestseller)


    for (let i = 0; i < files.length; i++) {

      formData.append('images', files[i]);

    }

    try {


      const response = await axios.post("/api/product/add", formData, { headers: { Authorization: `Bearer ${token} ` } })


      if (response.data.success) {

        toast.success(response.data.message)

        setFiles([])

        setName('')

        setDescription('')

        setPrice('')

        setCategory('戒指')

        setBestseller(false)


      } else {
        toast.error(response.data.message)
      }



    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }



  }



  return (

    <>

      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

        <div>

          <p className='mb-2'>上傳圖片</p>

          <div className='flex gap-6'>

            {[...Array(4)].map((_, index) => (

              <label key={index} htmlFor={`image${index}`}>

                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }} 
                  type="file" 
                  id={`image${index}`} 
                  hidden
                />

                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : admin_assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />

              </label>
            ))}

          </div>

        </div>

        <div className='w-full'>

          <p className='mb-2'>產品名稱</p>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Type here'
            className='w-full max-w-[500px] px-3 py-2 border'
            required
          />

        </div>

        <div className='w-full'>

          <p className='mb-2'>產品介紹</p>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder='Write content here'
            className='w-full max-w-[500px] px-3 py-2 border'
            required
            rows={8}
          />

        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-10'>

          <div>

            <p className='mb-2'>產品分類</p>

            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className='w-full px-3 py-2 border'
            >

              <option value="戒指">戒指</option>

              <option value="項鍊">項鍊</option>

              <option value="耳環">耳環</option>

              <option value="手環">手環</option>


            </select>

          </div>

          <div>

            <p className='mb-2'>產品價格</p>

            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder='???'
              className='w-full px-3 py-2 sm:w-[120px] border'
            />

          </div>


        </div>


        <div className='flex gap-2 mt-2'>

          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id='bestseller'
          />

          <label htmlFor="bestseller" className='cursor-pointer'>加到『發燒商品』</label>

        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded-md'>新增產品</button>


      </form>
    </>
  )
}

export default Add
