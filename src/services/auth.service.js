/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const sendOtp = (data) => {
  return axios
    .post(`${BASE_URL}/api/auth/checkmobile`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const verifyOtp = (data) => {
  return axios
    .post(`${BASE_URL}/api/auth/verifyotp`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const signinUser = (data) => {
  return axios
    .post(`${BASE_URL}/api/auth/signup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw Error;
    });
};

export const googleSignin = (data) => {
  return axios
    .post(`${BASE_URL}/api/googlelogin`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw (error.response.data);
    });
}
