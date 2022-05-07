import {
  SET_BOOKING_TIME,
  SET_BOOKING_DATE,
  UPDATE_LOGIN_MODAL,
  UPDATE_MODAL_NUMBER,
} from "../actionTypes/index";

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
