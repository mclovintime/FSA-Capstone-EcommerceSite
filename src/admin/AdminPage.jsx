import React from 'react'
import { Link } from 'react-router-dom'
import AdminProducts from './AdminProducts'
import AdminUsers from './AdminUsers'
import "./Admin.css"

 const AdminPage = ()=> {

  return (
    <div>
        <h2 className="adminpage-header">Welcome Admin</h2>
        <div><Link to="/AdminProducts" className="adminpage-link">Products</Link></div>
        <span><Link to="/AdminUsers" className="adminpage-link">User Data</Link></span>
    </div>
  )
}

export default AdminPage
