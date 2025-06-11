import React from 'react'
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Home = () => {
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
        <h1 className="text-center mt-3 text-2xl font-bold">Login</h1>

        <form className="p-4">
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm font-semibold"> Email</label>
            <input
            //   onChange={handleChange}
              className="border p-2 rounded-lg"
              type="email"
              placeholder="Enter your email"
              name="email"
            //   value={user.email}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2 relative">
            <label className="text-sm font-semibold">Password</label>
            <input
            //   onChange={handleChange}
              className="border p-2 rounded-lg"
            //   type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
            //   value={user.password}
            />
            {/* <div className="absolute top-9 right-3">
              {!showPassword ? (
                <VisibilityOffIcon
                  
                  fontSize="small"
                />
              ) : (
                <VisibilityIcon
                 
                  fontSize="small"
                />
              )}
            </div> */}
          </div>

          <div className="flex flex-col gap-1 mt-4 ">
            <button
              type="submit"
              className="bg-[#27667B] text-white font-bold p-2 rounded-lg"
            >
              Login
            </button>
            <p>
              Don't have an account?
              {/* <NavLink
                className={"text-indigo-600 font-semibold"}
                to={"/Signup"}
              >
                Signup
              </NavLink> */}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};


export default Home