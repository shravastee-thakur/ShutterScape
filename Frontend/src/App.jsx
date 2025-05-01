import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";
import Gallery from "./Pages/Gallery";
import Login from "./Pages/Login";
import Verify from "./Pages/Verify";
import UploadPage from "./Pages/UploadPage";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/upload" element={<UploadPage />} />{" "}
          {/* <-- Added this */}
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* Unauthorized Page */}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
