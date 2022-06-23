import {
  FETCH_COMPANIES_REQUESTED,
  FETCH_COMPANIES_SUCCESS,
  UPDATE_MENTOR_EXPERIENCE_REQUESTED,
  FETCH_MENTOR_DETAILS_REQUESTED,
  FETCH_MENTOR_DETAILS_SUCCESS,
  UPDATE_MENTOR_EXPERIENCE_SUCCESS,
  FETCH_COLLEGES_REQUESTED,
  FETCH_COLLEGES_SUCCESS,
  FETCH_CURRENT_MENTOR_DETAILS_REQUESTED,
  FETCH_CURRENT_MENTOR_DETAILS_SUCCESS,
} from "../actionTypes/index";

export const fetchCompaniesRequested = () => {
  return {
    type: FETCH_COMPANIES_REQUESTED,
  };
};

export const fetchCompaniesSuccess = (data) => {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    payload: data,
  };
};

export const fetchCollegesRequested = () => {
  return {
    type: FETCH_COLLEGES_REQUESTED,
  };
};

export const fetchCollegesSuccess = (data) => {
  return {
    type: FETCH_COLLEGES_SUCCESS,
    payload: data,
  };
};

export const fetchMentorDetailsRequested = (data) => {
  return {
    type: FETCH_MENTOR_DETAILS_REQUESTED,
    payload: data,
  };
};

export const fetchMentorDetailsSuccess = (data) => {
  return {
    type: FETCH_MENTOR_DETAILS_SUCCESS,
    payload: data,
  };
};

export const fetchCurrentMentorDetailsRequested = () => {
  return {
    type: FETCH_CURRENT_MENTOR_DETAILS_REQUESTED,
  };
};

export const fetchCurrentMentorDetailsSuccess = (data) => {
  return {
    type: FETCH_CURRENT_MENTOR_DETAILS_SUCCESS,
    payload: data,
  };
};

export const updateMentorExperienceRequested = (data) => {
  return {
    type: UPDATE_MENTOR_EXPERIENCE_REQUESTED,
    payload: data,
  };
};

export const updateMentorExperienceSuccess = (data) => {
  return {
    type: UPDATE_MENTOR_EXPERIENCE_SUCCESS,
    payload: data,
  };
};
