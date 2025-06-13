import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Admin = () => {
  const { users, setUsers, deleteUser } = useContext(AuthContext);

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    if (success) {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="admin-container flex flex-col items-center justify-center">
      <div className="w-full max-w-full md:max-w-[70%] overflow-auto">
        <h2 className="text-xl font-bold text-center mt-2">Manage Users</h2>

        <table className="border-collapse border border-gray-300 mt-4 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 md:px-4 py-2">Name</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2">
                Email
              </th>
              <th className="border border-gray-300 px-2 md:px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`px-3 py-1 rounded ${
                        user.role === "admin"
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white`}
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-8">
          <button className="bg-[#27667B] text-white font-bold p-2 rounded-lg">
            <NavLink to={"/"}>Go to Gallery</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
