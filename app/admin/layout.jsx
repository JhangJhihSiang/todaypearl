'use client';

import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '@/context/ShopContext';

const AdminLayout = ({ children }) => {


  const {token, router} = useContext(ShopContext);

  const [isAdmin, setIsAdmin] = useState(false); 

  const [loading, setLoading] = useState(true);   




  // 丟給後端驗證是否為管理員通行證的函式

  const checkAdmin = async () => {


    if (!token) {

      toast.error('您必須要先登入');

      router.push('/login'); 

      return;

    }

    try {

      // 去指定後端 api/user/check-admin 執行功能
      //  {headers: {Authorization: `Bearer ${token}`}} : 告訴後端我是誰

      const response = await axios.get('/api/user/check-admin', {headers: {Authorization: `Bearer ${token}`}})


      // 成功的話代表是管理員

      if (response.data.success) {

        setIsAdmin(true);  // 管理員身份驗證成功

      } else {

        toast.error(response.data.message);

        router.push('/');
      }
    } catch (error) {

      toast.error('Error validating admin');

      router.push('/login'); 
      
    } finally {

      setLoading(false);

    }

  };





  useEffect(() => {

    checkAdmin();

  }, [router]);




  if (loading){

    return (

      <div>
          Loading...
      </div>

    );
  }



  return (

    <>

      <Navbar />


      <div className='flex w-full'>



        <Sidebar />



        {/* admin 內的所有 page.jsx 的所有內容全部都會呈現在 children 中 */}



        <div className='w-[70%] ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>


          {children}


        </div>

      </div>

    </>

  );

};



export default AdminLayout;
