import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth(); // Get the logged-in user from Context API
  const [users, setUsers] = useState([]); // Store all registered users

  // Fetch all registered users (Admin API)
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getUser",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Delete user function
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/deleteUser/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("User deleted successfully");
        getUsers(); // Refresh user list
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = () => {
    navigate("/gallery");
  };

  // Redirect non-admin users
  if (!authUser) return <Navigate to="/" />;
  if (authUser.role !== "admin") return <Navigate to="/unauthorized" />;

  return (
    <div className="admin-container">
      <h2 className="text-xl font-bold">Manage Users</h2>

      <table className="border-collapse border border-gray-300 w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
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
                    disabled={user.role === "admin"} // Disables the button for admin
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
        <button
          onClick={handleClick}
          className="bg-[#27667B] text-white font-bold p-2 rounded-lg"
        >
          Go to Gallery
        </button>
      </div>
    </div>
  );
};

export default Admin;
