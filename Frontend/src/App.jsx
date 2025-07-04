import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Unauthorized from "./pages/Unauthorised";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import ImageUpload from "./pages/ImageUpload";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthProvider";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  const { accessToken } = useContext(AuthContext);
  return (
    <div className="h-screen overflow-y-scroll">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            {!accessToken && (
              <>
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </>
            )}
            
            {accessToken && (
              <>
                <Route path="/image-upload" element={<ImageUpload />} />
                <Route path="/change-password" element={<ChangePassword />} />
              </>
            )}

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Unauthorized />} />
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
