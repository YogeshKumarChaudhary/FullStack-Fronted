import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { storeTokenInLocal } = useAuth();

  const [user, serUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handlInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    serUser({
      ...user,
      [name]: value,
    });
  };
  const handlFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fullstack-backend-nwj1.onrender.com/api/auth/register",
        user
      );
      console.log("res", res);
      if (res.status === 200 || res.status === 201) {
        toast.success("Register SuccesFully");
        // console.log("res form server",res.data.token);
        storeTokenInLocal(res.data.token);
        serUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
      } else {
        // alert("invalid");
        // alert(res.response.data.extraDetails)
      }
    } catch (error) {
      console.log("Register", error);
      toast.error(error.response.data.extraDetails);
    }
  };
  return (
    <>
      <section className="bg-gray-100 py-4">
        <main className="px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Registration Image */}
            <div className="lg:w-[600px] flex justify-center">
              <img
                src="https://png.pngtree.com/png-vector/20220710/ourmid/pngtree-colorful-register-now-vector-png-image-png-image_5831724.png"
                alt="registrationImage"
                className="lg:w-[80%]"
              />
            </div>

            {/* Registration Form */}
            <div className="registration-form bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold mb-6">Registration Form</h1>

              <form onSubmit={handlFormSubmit}>
                {/* Username Input */}
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    value={user.username}
                    onChange={handlInput}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>

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

                {/* Phone Input */}
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Enter Your Phone"
                    required
                    value={user.phone}
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

export default Register;
