import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [verified, setVerified] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getaccessToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setAccessToken(res.data.accessToken);
          setRole(res.data.user.role);
          setVerified(res.data.user.verified);
          setUserId(res.data.user._id);
          setUserData(res.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Do nothing, user not logged in
        } else {
          console.error("Error during refresh token check:", error);
        }
      }
    };

    getaccessToken();
  }, []);

  // Users

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      

      if (res.data.success) {
        setUserId(res.data.userId);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const otpVerify = async (otp) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login/verify",
        { userId, otp },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        setAccessToken(res.data.accessToken);
        setRole(res.data.user.role);
        setVerified(res.data.user.verified);
        setUserData(res.data.user);
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.log("Otp verify failed");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/forget-password",
        { email },
        {
          withCredentials: true, // optional
        }
      );
      if (res.data.success) {
        return true;
      }
    } catch (error) {
      console.error(
        "Forget Password Error:",
        error.response?.data || error.message
      );
      return false;
    }
  };

  const resetPassword = async (userId, token, newPassword) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/reset-password",
        {
          userId,
          token,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return true;
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return true;
      }
    } catch (error) {
      console.error("Change Password Error:", error);
    }
  };

  // Fetch all registered users (Admin API)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/get-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
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

    if (role === "admin") {
      getUsers();
    }
  }, [role]);

  // Delete user function
  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/delete-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        return true;
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Images

  const logout = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setUserId(null);
        setAccessToken(null);
        setRole(null);
        setVerified(false);
        return true;
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          userId,
          login,
          role,
          accessToken,
          otpVerify,
          verified,
          forgotPassword,
          resetPassword,
          changePassword,
          users,
          setUsers,
          deleteUser,
          data: userData,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
