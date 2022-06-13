import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../API/userAPI'

const AdminRoute = () => {  
    return (
       isAuthenticated() && isAuthenticated().user.role === 1 ? 
       <Outlet/> : <Navigate to='/signin'></Navigate>
  )
}

export default AdminRoute