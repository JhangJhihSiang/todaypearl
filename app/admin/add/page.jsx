'use client'

import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { admin_assets } from '@/assets/admin_assets'
import { ShopContext } from '@/context/ShopContext'

const Add = () => {


  const { token } = useContext(ShopContext)

  // 圖片檔案
  const [files, setFiles] = useState([])

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');

  const [category, setCategory] = useState('戒指');

  const [bestseller, setBestseller] = useState(false);


  // 提交新增產品的表單

  const onSubmitHandler = async (e) => {

    e.preventDefault();


    // 建立表格資料，欄位與值


    const formData = new FormData()

    formData.append("name", name)

    formData.append("description", description)

    formData.append("price", price)

    formData.append("category", category)

    formData.append("bestseller", bestseller)


    // 從第一個元素開始遊歷files中的每個檔案，將每次遊歷到的檔案新增到 images欄位

    for (let i = 0; i < files.length; i++) {

      formData.append('images', files[i]);

    }


    try {


      // 去指定後端 api/product/add 執行功能
      //  { formData } ： 給後端的資料
      //  { headers: { Authorization: `Bearer ${token}` } } : 告訴後端我是誰

      const response = await axios.post("/api/product/add", formData, { headers: { Authorization: `Bearer ${token} ` } })


      // response.data 跟 {data} 是一樣的意思
      // 成功的話就跳出成功訊息，並將欄位回到初始狀態

      if (response.data.success) {

        toast.success(response.data.message, { autoClose: 500 })

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


      {/* 新增產品的表單 */}

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col w-full items-start gap-3'
      >


        {/* 上傳圖片（最多四個） */}


        <div>

          <p className='mb-2'>上傳圖片</p>

          <div className='flex gap-6'>


            {/* 創建長度為 4 的陣列 */}
            {/* 用戶在 index 1 的位置新增檔案時會觸發 OnChange，
                將檔案更新到 updatedFiles陣列中 index 1 的位置 */}

            {[...Array(4)].map((_, index) => (

              <label
                key={index}
                htmlFor={`image${index}`}
              >

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


                {/* 檢查 index 有無檔案，有的話就用該檔案，沒有的話就用 upload_area */}

                <Image
                  key={index}
                  src={files[index] ? URL.createObjectURL(files[index]) : admin_assets.upload_area}
                  alt="upload_area"
                  width={100}
                  height={100}
                  className="max-w-24 cursor-pointer"
                />

              </label>

            ))}


          </div>


        </div>


        {/* 產品名稱 */}

        <div className='w-full'>

          <p className='mb-2'>產品名稱</p>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Type here'
            required
            className='w-full max-w-[500px] px-3 py-2 border'
          />

        </div>


        {/* 產品介紹 */}

        <div className='w-full'>

          <p className='mb-2'>產品介紹</p>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder='Write content here'
            required
            rows={8}
            className='w-full max-w-[500px] px-3 py-2 border'
          />

        </div>




        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-10'>


          {/* 產品分類 */}

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


          {/* 產品價格 */}

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


        {/* 是否為發燒商品 ? */}


        <div className='flex gap-2 mt-2'>

          <input
            onChange={() => setBestseller((prev) => !prev)}
            type="checkbox"
            checked={bestseller}
            id='bestseller'
          />

          <label
            htmlFor="bestseller"
            className='cursor-pointer'
          >

            加到『發燒商品』

          </label>


        </div>


        {/* 按鈕會觸發onSubmit功能，提交表單，執行 {onSubmitHandler} */}

        <button
          type='submit'
          className='w-28 py-3 mt-4 bg-black text-white rounded-md'
        >

          新增產品

        </button>


      </form>


    </>
  )
}

export default Add
