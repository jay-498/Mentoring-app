/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const loginUser = (data) => {
  return axios
    .post(`${BASE_URL}/api/auth/checkmobile`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const signinUser = (data) => {
  console.log("services", data);
  return axios
    .post(`${BASE_URL}/api/auth/signup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
