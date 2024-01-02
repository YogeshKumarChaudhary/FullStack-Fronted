import React, { useEffect, useRef, useState, Fragment } from "react";
import { useAuth } from "../store/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

const AdminUsers = () => {
  // model
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [user, setUser] = useState([]);
  const [input, setInput] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [editId, setEditId] = useState(false);
  const { authorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const res = await axios.get("https://fullstack-backend-nwj1.onrender.com/api/admin/users", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("getAllUsersData ", res);
      setUser(res.data);
    } catch (error) {
      console.log("getAllUsersData Error", error);
      alert(error.response.data.message);
    }
  };
  const deleteUser = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(
        `https://fullstack-backend-nwj1.onrender.com/api/admin/users/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log(res);
      getAllUsersData();
      toast.success("User Deleted SuccesFully");
    } catch (error) {
      console.log("deleteUser Error", error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.response.data
      );
    }
  };
  const updateUser = async () => {
    try {
      const res = await axios.put(
        `https://fullstack-backend-nwj1.onrender.com/api/admin/users/update/${editId}`,
        input,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log(res);
      toast.success("User Updated SuccesFully");
    } catch (error) {
      console.log("updateUser Error", error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.response.data
      );
    }
  };
  const handlChage = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handlUpdate = () => {
    updateUser(),
      getAllUsersData(),
      setInput({
        username: "",
        email: "",
        phone: "",
      }),
      setEditId(false),
      setOpen(false);
  };
  useEffect(() => {
    getAllUsersData();
  }, [setEditId]);
  return (
    <div className="p-4 sm:w-full">
      <div className="flex flex-col sm:flex-row bg-slate-300 justify-between p-4 font-bold">
        <p className="mb-2 sm:mb-0 sm:w-1/4">UserName</p>
        <p className="mb-2 sm:mb-0 sm:w-1/4">Email</p>
        <p className="mb-2 sm:mb-0 sm:w-1/4">Phone</p>
        <p className="mb-2 sm:mb-0 sm:w-1/12">Update</p>
        <p className="sm:w-1/12">Delete</p>
      </div>
      {user ? (
        user.map((data, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center justify-between shadow-lg p-4 mb-4"
          >
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.username}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.email}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/4">{data.phone}</p>
            <button
              className="w-full sm:w-1/12 p-2 bg-green-500 rounded-sm text-white font-bold"
              onClick={() => (
                setEditId(data._id), setInput(data), setOpen(true)
              )}
            >
              Edit
            </button>
            <button
              className="w-full sm:w-1/12 p-2 bg-red-500 rounded-sm text-white font-bold"
              onClick={() => deleteUser(data._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-gray-900"
                        >
                          Update User
                        </Dialog.Title>
                        <div className="mt-6">
                          <div className="flex">
                            <div htmlFor="username" className="font-medium">
                              UserName :{" "}
                            </div>
                            <input
                              id="username"
                              type="text"
                              value={input.username}
                              name="username"
                              onChange={handlChage}
                              placeholder="Enter Username"
                              className="border-b border-black ml-2 focus:outline-none"
                            />
                          </div>
                          <div className="flex mt-2">
                            <div htmlFor="email" className="font-medium">
                              Email :{" "}
                            </div>
                            <input
                              id="email"
                              type="email"
                              value={input.email}
                              name="email"
                              onChange={handlChage}
                              placeholder="Enter Email"
                              className="border-b border-black ml-7 focus:outline-none"
                            />
                          </div>
                          <div className="flex mt-2">
                            <div htmlFor="phone" className="font-medium">
                              Phone :{" "}
                            </div>
                            <input
                              id="phone"
                              type="text"
                              name="phone"
                              value={input.phone}
                              onChange={handlChage}
                              placeholder="Enter Phone"
                              className="border-b border-black ml-5 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="p-2 ml-3 bg-green-700 rounded-sm text-white font-medium hover:bg-green-600"
                      onClick={() => handlUpdate()}
                    >
                      Update
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AdminUsers;
