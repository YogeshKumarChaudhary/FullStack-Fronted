import React, { useEffect, useState, Fragment, useRef } from "react";
import { useAuth } from "../store/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

const AdminServices = () => {
  // model State
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const { authorizationToken } = useAuth();
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(false);
  const [input, setInput] = useState({
    service: "",
    price: "",
    provider: "",
    description: "",
  });
  const getAllServicesData = async () => {
    try {
      const res = await axios.get("https://fullstack-backend-nwj1.onrender.com/api/admin/services", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log(res);
      setServices(res.data);
    } catch (error) {
      console.log("getAllServicesData error", error);
    }
  };
  const deleteService = async (id) => {
    try {
      const res = await axios.delete(
        `https://fullstack-backend-nwj1.onrender.com/api/admin/services/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log(res);
      getAllServicesData();
      toast.success("Service Deleted SuccesFully");
    } catch (error) {
      console.log("deleteService error", error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.response.data
      );
    }
  };
  const updateServices = async () => {
    try {
      const res = await axios.put(
        `https://fullstack-backend-nwj1.onrender.com/api/admin/services/update/${editId}`,
        input,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // console.log(res);
      toast.success("Service Updated SuccessFully");
    } catch (error) {
      console.log("updateServices Error", error);
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
    updateServices(),
      getAllServicesData(),
      setInput({
        service: "",
        price: "",
        provider: "",
        description: "",
      });
    setEditId(false), setOpen(false);
  };
  useEffect(() => {
    getAllServicesData();
  }, [setEditId]);
  return (
    <div className="p-4 sm:w-full">
      <div className="flex flex-col sm:flex-row bg-slate-300 justify-between p-4 font-bold">
        <p className="mb-2 sm:mb-0 sm:w-1/6">Service</p>
        <p className="mb-2 sm:mb-0 sm:w-1/6">Price</p>
        <p className="mb-2 sm:mb-0 sm:w-1/6">Provider</p>
        <p className="mb-2 sm:mb-0 sm:w-2/6">Description</p>
        <p className="mb-2 sm:mb-0 sm:w-1/6">Update</p>
        <p className="sm:w-1/6">Delete</p>
      </div>
      {services ? (
        services.map((data, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-center justify-between shadow-lg p-4 mb-4"
          >
            <p className="mb-2 sm:mb-0 sm:w-1/6">{data.service}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/6">{data.price}</p>
            <p className="mb-2 sm:mb-0 sm:w-1/6">{data.provider}</p>
            <p className="mb-2 sm:mb-0 sm:w-2/6">{data.description}</p>
            <button
              className="w-full sm:w-1/6 p-2 bg-green-500 rounded-sm text-white font-bold"
              onClick={() => (
                setEditId(data._id), setInput(data), setOpen(true)
              )}
            >
              Edit
            </button>
            <button
              className="w-full sm:w-1/6 p-2 bg-red-500 rounded-sm text-white font-bold"
              onClick={() => deleteService(data._id)}
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
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-gray-900"
                        >
                          Update Services
                        </Dialog.Title>
                        <div className="mt-6">
                          <div className="flex">
                            <div htmlFor="service" className="font-medium">
                              Service :{" "}
                            </div>
                            <input
                              id="service"
                              type="text"
                              value={input.service}
                              name="service"
                              onChange={handlChage}
                              placeholder="Enter Service"
                              className="border-b border-black ml-2 focus:outline-none"
                            />
                          </div>
                          <div className="flex mt-2">
                            <div htmlFor="price" className="font-medium">
                              Price :{" "}
                            </div>
                            <input
                              id="price"
                              type="text"
                              value={input.price}
                              name="price"
                              onChange={handlChage}
                              placeholder="Enter Price"
                              className="border-b border-black ml-7 focus:outline-none"
                            />
                          </div>
                          <div className="flex mt-2">
                            <div htmlFor="provider" className="font-medium">
                              Provider :{" "}
                            </div>
                            <input
                              id="provider"
                              type="text"
                              name="provider"
                              value={input.provider}
                              onChange={handlChage}
                              placeholder="Enter Provider"
                              className="border-b border-black ml-5 focus:outline-none"
                            />
                          </div>
                          <div className="flex mt-2">
                            <div htmlFor="description" className="font-medium">
                              Description :{" "}
                            </div>
                            <input
                              id="description"
                              type="text"
                              name="description"
                              value={input.description}
                              onChange={handlChage}
                              placeholder="Enter Description"
                              className="border-b border-black ml-5 focus:outline-none sm:w-2/3"
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

export default AdminServices;
