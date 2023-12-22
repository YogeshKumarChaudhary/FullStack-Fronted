import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const Contact = () => {
  const { userData } = useAuth();
  const [isUserData, setIsUserData] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  if (isUserData && userData) {
    setUser({
      username: userData.username,
      email: userData.email,
      message: "",
    });

    setIsUserData(false);
  }

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
    console.log(user);
    try {
      const res = await axios.post(
        "https://fullstack-backend-nwj1.onrender.com/api/form/contact",
        user
      );
      toast.success("Message Send SuccesFully");
      console.log(res);
      setUser({
        username: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="bg-white py-4">
        <main className="px-5">
          <h1 className="text-center font-bold text-3xl text-blue-500">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/*  Image */}
            <div className="md:w-[600px] flex justify-center">
              <img
                src="https://images.template.net/78027/Free-Contact-Us-Illustration-JPEG-1.jpg"
                alt="Image"
                className="w-[80%]"
              />
            </div>

            {/*  Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
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

                {/* Password Input */}
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-600"
                  >
                    message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="4"
                    placeholder="Enter Your Message"
                    value={user.message}
                    onChange={handlInput}
                    className="mt-1 p-2 w-full border rounded-md"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>
        <div className="mt-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.8491130221782!2d72.63867057397088!3d23.24857715785903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b8b621b89cb%3A0xbdfcfa66f3dbc3f6!2sSahakar%20Colony%2C%20Sector%2025%2C%20Gandhinagar%2C%20Gujarat%20382027!5e0!3m2!1sen!2sin!4v1702359629403!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
