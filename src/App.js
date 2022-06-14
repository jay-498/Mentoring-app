import "./App.css";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/home";
import Profile from "./components/profile/Profile";
import { Routes, Route } from "react-router-dom";
import MentorSearch from "./pages/MentorSearch";
import { Fragment } from "react";

function App() {
  return (
    <div className="flex flex-col">
      <div>
        <Routes>
          <Route path="/"element={
              <Fragment>
                  <Navbar />
                  <HomePage />
              </Fragment>
            }/>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search"element={
              <Fragment>
                  <Navbar />
                  <MentorSearch />
              </Fragment>
            }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
