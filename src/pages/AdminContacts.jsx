import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contact, setContact] = useState([]);
  const getAllContactData = async () => {
    try {
      const res = await axios.get("https://fullstack-backend-nwj1.onrender.com/api/admin/contacts", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log(res);
      setContact(res.data);
    } catch (error) {
      console.log("getAllContactData Error", error);
    }
  };
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(
        `https://fullstack-backend-nwj1.onrender.com/api/admin/contacts/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log(res);
      toast.success("Contact Deleted SuccesFully");
      getAllContactData();
    } catch (error) {
      console.log("deleteContact Error", error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.response.data
      );
    }
  };
  useEffect(() => {
    getAllContactData();
  }, []);
  return (
    <div className="p-4 sm:w-full">
      <div className="flex flex-col sm:flex-row bg-slate-300 justify-between p-4 font-bold">
        <p className="mb-2 sm:mb-0 sm:w-1/4">UserName</p>
        <p className="mb-2 sm:mb-0 sm:w-1/4">Email</p>
        <p className="mb-2 sm:mb-0 sm:w-1/4">Message</p>
        {/* <p className="mb-2 sm:mb-0 sm:w-1/12">Update</p> */}
        <p className="sm:w-1/12">Delete</p>
      </div>
      {contact ? (
        contact.map((data, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center justify-between shadow-lg p-4 mb-4"
          >
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.username}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.email}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.message}</p>
            {/* <button className="w-full sm:w-1/12 p-1.5 bg-green-500 rounded-sm text-white font-bold">
              Edit
            </button> */}
            <button
              className="w-full sm:w-1/12 p-1.5 bg-red-500 rounded-sm text-white font-bold"
              onClick={() => deleteContact(data._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminContacts;
