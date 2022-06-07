import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const updateCalenderEvent = (data) => {
  console.log("bookingservices",data)
  return axios
    .post(`${BASE_URL}/api/event`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw Error(error.response.data);
    });
};