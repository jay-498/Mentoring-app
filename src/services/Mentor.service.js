import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const updateMentorExperience = (data) => {
  const jwt_token = localStorage.getItem("user_token");
  return axios
    .put(`${BASE_URL}/api/mentor/me`, data, {
      headers: {
        "x-auth-token": jwt_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCompanies = () => {
  return axios
    .get(`${BASE_URL}/api/company`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getColleges = () => {
  return axios
    .get(`${BASE_URL}/api/college`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw Error(error.res.data);
    });
};

export const getMentorById = ({ id }) => {
  return axios
    .get(`${BASE_URL}/api/mentor/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
