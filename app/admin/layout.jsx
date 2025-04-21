'use client';

import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLayout = ({ children }) => {

  const [isAdmin, setIsAdmin] = useState(false);  // 管理員身份

  const [loading, setLoading] = useState(true);   // 頁面加載狀態

  const router = useRouter();  // 用於重定向



  const checkAdmin = async () => {


    const token = localStorage.getItem('token');  // 從 localStorage 獲取 token

    if (!token) {

      toast.error('您必須要先登入');

      router.push('/login');  // 如果沒有 token，重定向到登錄頁面

      return;

    }

    try {
      // 發送請求到後端驗證 token 是否有效以及角色是否為 admin

      const response = await axios.get('/api/user/check-admin', {headers: {Authorization: `Bearer ${token}`}})


      if (response.data.success) {
        setIsAdmin(true);  // 管理員身份驗證成功
      } else {
        toast.error(response.data.message);
        router.push('/');  // 如果不是管理員，重定向到首頁
      }
    } catch (error) {

      toast.error('Error validating admin');

      router.push('/login');  // 發生錯誤，重定向到登錄頁面
      
    } finally {
      setLoading(false);  // 加載完成
    }
  };


  useEffect(() => {

    checkAdmin();

  }, [router]);


  if (loading) return <div>Loading...</div>;



  return (

    <>

      <Navbar />


      <div className='flex w-full'>



        <Sidebar />



        <div className='w-[70%] ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>


          {children}


        </div>

      </div>
    </>
  );
};

export default AdminLayout;
