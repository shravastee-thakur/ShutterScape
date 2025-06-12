import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        setUserId(res.data.userId);
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
        setData(res.data.user);
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

  const logout = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUserId(null);
        setAccessToken(null);
        setData(null);
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
          data,
          accessToken,
          otpVerify,
          forgotPassword,
          resetPassword,
          changePassword,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
