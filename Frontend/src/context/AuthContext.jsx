import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user data on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/getUser",
          { withCredentials: true }
        );
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.log("User not authenticated", error);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        userData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
