import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Services = () => {
  const { data } = useAuth();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-7">
      {data ? (
        data.map((item, i) => {
          return (
            <div
              key={i}
              className="lg:my-10 flex items-center justify-center gap-2"
            >
              <div className="max-w-[20rem] min-w-[20rem] h-72 p-3 flex flex-col justify-evenly bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/869/739/non_2x/file-management-concept-illustration-modern-concept-of-file-management-system-online-document-storage-service-free-png.png"
                    alt="service image"
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">{item.provider}</p>
                  <p className="font-medium text-blue-800">{item.price}</p>
                </div>
                <div>
                  <h6 className="mb-2 text-2xl text-blue-500 font-bold tracking-tight">
                    {item.service}
                  </h6>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Services;
