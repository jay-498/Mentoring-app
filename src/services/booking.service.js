import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const updateCalenderEvent = (data) => {
  return axios
    .post(`${BASE_URL}/api/event`, data, {
      headers : {
        'x-auth-token' : data.jwt_token
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw Error(error.response.data);
    });
};