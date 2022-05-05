import Booking from "./components/booking";
import "./App.css";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/home";
import Profile from "./components/profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col">
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
