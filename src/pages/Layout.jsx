import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../component/Header'
const Layout = () => {
    const user = useSelector(store=> store?.user?.user)
    const navigate = useNavigate();
    
   
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
