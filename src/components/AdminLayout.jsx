import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="sm:flex">
      <ul className="sm:w-[15%] bg-slate-300 flex flex-col p-5 text-blue-900 font-bold">
        <li>
          <Link to="/admin/users" className="flex mb-4">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/contacts" className="flex mb-4">
            Contacts
          </Link>
        </li>
        <li>
          <Link to="/admin/services" className="flex mb-4">
            Services
          </Link>
        </li>
        {/* <li>
          <Link to="/" className="flex mb-4">
            Home
          </Link>
        </li> */}
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
