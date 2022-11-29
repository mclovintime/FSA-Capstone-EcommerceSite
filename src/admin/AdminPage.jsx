import React from 'react'
import { useParams } from 'react-router-dom'
import AdminProducts from './AdminProducts'

 const AdminPage = ()=> {

  return (
    <div>
        <h1>Welcome</h1>
        <AdminProducts />

    </div>
  )
}

export default AdminPage
