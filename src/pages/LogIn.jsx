import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();
  const { storeTokenInLocal } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handlInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handlFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const res = await axios.post(
        "https://fullstack-backend-nwj1.onrender.com/api/auth/login",
        user
      );
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        storeTokenInLocal(res.data.token);
        toast.success("Login SuccesFully");
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        // alert("Invalid Credencial");
        console.log("Login Invalid Credencial");
      }
    } catch (error) {
      console.log("Login Error", error);
      error.response
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <section className="bg-gray-100 py-16">
        <main className="px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Registration Image */}
            <div className="lg:w-[600px] flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                alt="registrationImage"
                className="w-[60%]"
              />
            </div>

            {/* Registration Form */}
            <div className="registration-form bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold mb-6">Login Form</h1>

              <form onSubmit={handlFormSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    required
                    value={user.email}
                    onChange={handlInput}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    required
                    value={user.password}
                    onChange={handlInput}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default LogIn;
