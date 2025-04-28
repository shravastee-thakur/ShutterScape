import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";
import Gallery from "./Pages/Gallery";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute role="admin" />}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
