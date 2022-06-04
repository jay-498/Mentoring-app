import {
  SET_BOOKING_TIME,
  SET_BOOKING_DATE,
  UPDATE_LOGIN_MODAL,
  UPDATE_MODAL_NUMBER,
  UPDATE_CALENDER_EVENT_SUCCESS
} from "../actionTypes/index";

const initialState = {
  timings: [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "2:00",
    "3:00",
    "5:00",
    "6:00",
    "7:00",
  ],
  booking_time: null,
  booking_date: null,
  showLoginModal: false,
  currentModalNumber: 1,
  unbooked_dates: ["03/14/2022", "03/16/2022", "03/18/2022"],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_TIME:
      return { ...state, booking_time: action.payload };

    case SET_BOOKING_DATE:
      return { ...state, booking_date: action.payload };

    case UPDATE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.payload,
      };

    case UPDATE_CALENDER_EVENT_SUCCESS:
      return{
        ...state,
        showLoginModal: false,
      }

    case UPDATE_MODAL_NUMBER:
      return {
        ...state,
        currentModalNumber: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;
