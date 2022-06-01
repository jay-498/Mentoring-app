import axios from "axios";
import { BASE_URL } from "../assets/js/config";

export const updateCalenderEvent = (data) => {
  return axios
    .post(`${BASE_URL}/api/calendar`, data)
    .then((res) => {
      window.open(res.data.authUrl);
      return res;
    })
    .catch((error) => {
      throw Error(error.response.data);
    });
};