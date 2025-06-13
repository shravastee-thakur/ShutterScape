import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { data, verified, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="bg-[#27667B] text-white  h-[80px] p-4 lg:p-6 flex justify-between items-center">
      <h1 className="text-2xl lg:text-4xl font-semibold md:px-10">
        ShutterScape
      </h1>
      <div className="md:px-10 flex items-center gap-4">
        {verified && data && (
          <div className="text-center">
            <h3 className="font-bold">Welcome</h3>
            <p>{data?.name}</p>
          </div>
        )}

        <div>
          {verified ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white md:font-bold font-semibold px-2 md:py-1 rounded-lg"
            >
              Logout
            </button>
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
