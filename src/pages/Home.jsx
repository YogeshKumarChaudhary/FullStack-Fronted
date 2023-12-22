import Analytics from "../components/Analytics";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <main className="mx-auto">
        {/* 1st section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between mx-4">
          {/* Content */}
          <div className="md:w-1/2 md:pr-8">
            <p className="text-gray-500">We are the World Best IT Company</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-500">
              Welcome to Microsoft Corporation
            </h1>
            <p className="text-gray-700">
              Are you ready to take your business to the next level with
              cutting-edge IT solutions? Look no further! At Microsoft Corporation, we
              specialize in providing innovative IT services and solutions
              tailored to meet your unique needs.
            </p>
            <div className="mt-6">
              <NavLink to="/contact">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">
                  Connect Now
                </button>
              </NavLink>
              <NavLink to="/services">
                <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full">
                  Learn More
                </button>
              </NavLink>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://i.pinimg.com/736x/03/2d/b5/032db574a23b523b79481d8d222a41ca.jpg"
              className="w-[90%]"
            />
          </div>
        </section>

        {/* 2nd section */}
        <Analytics />

        {/* 3rd section */}
        <section className="flex flex-col md:flex-row items-center mt-0 justify-between mb-2">
          <div className="md:w-1/2 md:pl-8 flex items-center">
            <img
              src="https://img.freepik.com/free-psd/3d-nft-icon-developer-male-illustration_629802-6.jpg?w=2000"
              alt="coding together"
              className="md:w-[75%]"
            />
          </div>

          <div className="md:w-1/2 mx-4 mt-3">
            <p className="text-gray-500">We are here to help you</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Get Started Today
            </h1>
            <p className="text-gray-700">
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Microsoft can help your business thrive in
              the digital age.
            </p>
            <div className="mt-6">
              <NavLink to="/contact">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">
                  Connect Now
                </button>
              </NavLink>
              <NavLink to="/services">
                <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full">
                  Learn More
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
