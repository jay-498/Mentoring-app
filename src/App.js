import "./App.css";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/home";
import MentorDetails from "./components/profile/MentorDetails";
import MentorProfile from "./components/profile/MentorProfile";
import { Routes, Route } from "react-router-dom";
import MentorSearch from "./pages/MentorSearch";
import { Fragment } from "react";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col">
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <HomePage />
              </Fragment>
            }
          />
          <Route path="/profile/:id" element={<MentorDetails />} />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <MentorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <Fragment>
                <MentorSearch />
              </Fragment>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
