import {
  SET_BOOKING_TIME,
  SET_BOOKING_DATE,
  UPDATE_LOGIN_MODAL,
  UPDATE_MODAL_NUMBER,
  UPDATE_CALENDER_EVENT_REQUESTED,
  UPDATE_CALENDER_EVENT_SUCCESS,
  UPDATE_BOOKING_MODAL
} from "../actionTypes/index";

export const updateCalenderEventRequested = (data) => {
  return {
    type: UPDATE_CALENDER_EVENT_REQUESTED,
    payload: data,
  };
};

export const updateBookingModal = (data) => {
  return {
    type: UPDATE_BOOKING_MODAL,
    payload: data,
  };
};

export const updateCalenderEventSuccess = (data) => {
  return {
    type: UPDATE_CALENDER_EVENT_SUCCESS,
  };
};


export const UpdateLoginModal = (data) => {
  return {
    type: UPDATE_LOGIN_MODAL,
    payload: data,
  };
};

export const updateModalNUmber = (data) => {
  return {
    type: UPDATE_MODAL_NUMBER,
    payload: data,
  };
};

export const updateBookingTime = (data) => {
  return {
    type: SET_BOOKING_TIME,
    payload: data,
  };
};

export const updateBookingDate = (data) => {
  return {
    type: SET_BOOKING_DATE,
    payload: data,
  };
};
