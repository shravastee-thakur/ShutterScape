import React from "react";
import { NavLink } from "react-router-dom";

// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

const Verify = () => {
  return (
    <section className="mt-8 lg:mt-20 flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/HeroBack.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/4 border-2 rounded-xl p-4 md:p-6 bg-white bg-opacity-40">
        <form className="p-4">
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">OTP</label>
            <input
              className="border p-2 rounded-lg"
              type="OTP"
              placeholder="Enter your OTP"
              name="password"
              // value={user.password}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-[#27667B] text-white font-bold p-2 rounded-lg"
            >
              Submit
            </button>
            
          </div>
        </form>
      </div>
    </section>
  );
};

export default Verify;
