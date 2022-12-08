import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminPage = () => {
  return (
    <div>
      <h2 className="adminpage-header">Welcome Admin</h2>
      <span>
        <Link to="/AdminProducts" className="adminpage-link">
          Products
        </Link>
      </span>
      <span>
        <Link to="/AdminUsers" className="adminpage-link">
          User Data
        </Link>
      </span>
    </div>
  );
};

export default AdminPage;
