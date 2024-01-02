import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { FiAlignLeft } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [toggle, setToggle] = useState(true);
  // console.log(isLoggedIn);
  const handlToggle = () => {
    setToggle(!toggle);
  };
  const handlChnage = () => {
    toggle ? "" : setToggle(!toggle);
  };
  return (
    <div className="flex justify-between items-center px-5 py-6 bg-gray-200 ">
      <div className="font-bold text-blue-800">
        <Link to="/">Mern</Link>
      </div>
      <div className={`${toggle ? "hidden md:block" : "w-full"}`}>
        <ul
          className={`${
            toggle ? "flex gap-4 font-medium text-blue-800" : "toggleNav"
          }`}
        >
          <li onClick={handlChnage}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={handlChnage}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={handlChnage}>
            <Link to="/contact">Contact</Link>
          </li>
          <li onClick={handlChnage}>
            <Link to="/services">Services</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li onClick={handlChnage}>
                <Link to="/logout">LogOut</Link>
              </li>
              <li onClick={handlChnage}>
                <Link to="/admin">Admin</Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={handlChnage}>
                <Link to="/login">LogIn</Link>
              </li>
              <li onClick={handlChnage}>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="md:hidden" onClick={handlToggle}>
        <FiAlignLeft className="text-3xl text-blue-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
