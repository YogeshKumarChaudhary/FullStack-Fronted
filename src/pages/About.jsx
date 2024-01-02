import React from "react";
import { Link } from "react-router-dom";
import Analytics from "../components/Analytics";
import { useAuth } from "../store/Auth";

const About = () => {
  const { userData } = useAuth();
  return (
    <>
      <section className="py-5">
        <div className="bg-white md:py-16 px-4 md:px-10 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="md:w-[40%]">
            <p className="text-sm text-gray-700">
              Welcome{" "}
              {userData ? (
                <span>
                  <span className=" text-blue-500">{userData.username}</span> To
                  Our Website
                </span>
              ) : (
                "To Our Website"
              )}
            </p>
            <h1 className="text-3xl font-bold text-blue-500">Why Chose Us ?</h1>
            <div className="text-justify mt-2">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quaerat at dolor doloribus magni nobis, quo perspiciatis illo
                excepturi quos aliquam.
              </p>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                dolore architecto voluptatum, nostrum delectus sapiente itaque
                sit ipsum! Debitis, vero.
              </p>
              <p className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                explicabo impedit consectetur similique ipsam qui, molestiae
                officia cum sint nulla.
              </p>
            </div>
            <div className="mt-4">
              <Link to="/contact">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">
                  Connect Now
                </button>
              </Link>
              <Link to="/services">
                <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-[40%]">
            <img
              src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-about-us-abstract-concept-vector-illustration-png-image_5575279.png"
              className="mix-blend-difference"
              alt=""
            />
          </div>
        </div>
        <Analytics />
      </section>
    </>
  );
};

export default About;
