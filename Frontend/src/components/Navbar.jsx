import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { data, verified, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="bg-[#27667B] text-white h-[80px] p-4 lg:p-6 flex justify-between items-center ">
      <h1 className="text-2xl lg:text-4xl font-semibold md:px-10">
        <NavLink to={"/"}>ShutterScape</NavLink>
      </h1>
      <div className="md:px-10 flex items-center gap-4">
        {verified && data ? (
          <div className="text-center">
            <h3 className="font-bold text-sm">Welcome</h3>
            <p className="text-sm">{data?.name}</p>
          </div>
        ) : null}

        <div>
          {verified ? (
            <div className="relative py-2 group">
              <button onClick={toggleDropdown}>
                <AccountCircleIcon fontSize="large" />
              </button>

              <div
                className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-white border border-gray-600 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <NavLink to={"/image-upload"}>
                  <p className="cursor-pointer text-black text-sm">Upload</p>
                </NavLink>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={handleLogout}
                  className="cursor-pointer text-black text-sm"
                >
                  Logout
                </p>
                {role === "admin" && (
                  <>
                    <hr className="my-2 border-t border-gray-500" />
                    <NavLink to={"/admin"}>
                      <p className="cursor-pointer text-red-700 text-sm">
                        Admin
                      </p>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          ) : (
            <button className="bg-[#45b8df] text-white md:font-bold font-semibold px-2 md:py-1 rounded-lg">
              <NavLink to={"/login"}>Login</NavLink>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
