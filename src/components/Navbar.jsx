import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
      <div className="font-bold text-blue-800">Logo</div>
      <div className={`${toggle ? "hidden md:block" : "w-full"}`}>
        <ul
          className={`${
            toggle ? "flex gap-4 font-medium text-blue-800" : "toggleNav"
          }`}
        >
          <li onClick={handlChnage}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={handlChnage}>
            <NavLink to="/about">About</NavLink>
          </li>
          <li onClick={handlChnage}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li onClick={handlChnage}>
            <NavLink to="/services">Services</NavLink>
          </li>
          {isLoggedIn ? (
            <li onClick={handlChnage}>
              <NavLink to="/logout">LogOut</NavLink>
            </li>
          ) : (
            <>
              <li onClick={handlChnage}>
                <NavLink to="/login">LogIn</NavLink>
              </li>
              <li onClick={handlChnage}>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="md:hidden" onClick={handlToggle}>
        <FiAlignLeft className="text-3xl text-blue-800" />
      </div>
    </div>
  );
};

export default Navbar;
