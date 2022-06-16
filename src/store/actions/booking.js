import {
  SET_BOOKING_TIME,
  SET_BOOKING_DATE,
  UPDATE_LOGIN_MODAL,
  UPDATE_MODAL_NUMBER,
  UPDATE_CALENDER_EVENT_REQUESTED,
  UPDATE_CALENDER_EVENT_SUCCESS,
  UPDATE_BOOKING_MODAL,
  FETCH_MENTOR_EVENTS_REQUESTED,
  FETCH_MENTOR_EVENTS_SUCCESS
} from "../actionTypes/index";

export const updateCalenderEventRequested = (data) => {
  return {
    type: UPDATE_CALENDER_EVENT_REQUESTED,
    payload: data,
  };
};

export const  fetchMentorEventRequested= (data) => {
  return {
    type: FETCH_MENTOR_EVENTS_REQUESTED,
    payload: data,
  };
};

export const  fetchMentorEventSuccess= (data) => {
  return {
    type: FETCH_MENTOR_EVENTS_SUCCESS,
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
