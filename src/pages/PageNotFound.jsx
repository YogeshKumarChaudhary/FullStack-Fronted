import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Oops! Page not found.</p>
        <p className="text-gray-700">
          The page you are looking for might doesn't exitst.
        </p>
        <div className="mt-5 flex justify-center gap-4">
          <NavLink
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            to="/"
          >
            Return Home
          </NavLink>
          <NavLink
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            to="/contact"
          >
            Report Problem
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
