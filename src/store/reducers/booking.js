import {
  SET_BOOKING_TIME,
  SET_BOOKING_DATE,
  UPDATE_LOGIN_MODAL,
  UPDATE_MODAL_NUMBER,
  UPDATE_CALENDER_EVENT_SUCCESS,
  UPDATE_BOOKING_MODAL,
  FETCH_MENTOR_EVENTS_SUCCESS
} from "../actionTypes/index";

const initialState = {
  bookingModal: 0,
  showLoginModal: false,
  currentModalNumber: 1,
  AllEvents: [],
  UpcomingEvents: [],
  PastEvents: []
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: action.payload,
      };
    
    case FETCH_MENTOR_EVENTS_SUCCESS:
      if(action.payload.type==='U'){
        return{
          ...state,
          UpcomingEvents: [...action.payload.data]
        }
      }
      else if(action.payload.type==='P'){
        return{
          ...state,
          PastEvents: [...action.payload.data]
        }
      }
      else{
        return{
          ...state,
          AllEvents: [...action.payload.data]
        }
      }

    case UPDATE_BOOKING_MODAL:
      return {
        ...state,
        bookingModal: action.payload,
      }

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
