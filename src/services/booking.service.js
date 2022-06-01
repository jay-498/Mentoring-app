import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const updateCalenderEvent = (data) => {
  return axios
    .post(`${BASE_URL}/api/calendar`, data)
    .then((res) => {
      return res.data.eventResponse;
    })
    .catch((error) => {
      throw Error(error.response.data);
    });
};