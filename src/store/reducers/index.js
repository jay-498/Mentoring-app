import { combineReducers } from "redux";
import booking from "./booking";
import Login from "./Login";
import Mentor from "./Mentor";

export default combineReducers({
  booking,
  Login,
  Mentor,
});
