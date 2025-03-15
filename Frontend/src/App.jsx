import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized";
import Gallery from "./Pages/Gallery";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute role="admin" />}></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
