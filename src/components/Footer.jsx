import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm mt-2 text-blue-800 font-medium">
          © {new Date().getFullYear()}. All Rights Reserved By Yogesh Chaudhary
        </p>
      </div>
    </footer>
  );
};

export default Footer;
