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

export const getMentorAvailability = (data) => {
  console.log(data)
  const {id,jwt_token} = data;
  return axios
    .get(`${BASE_URL}/api/mentoravailability/${id}`, data, {
      headers : {
        'x-auth-token' : jwt_token
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("services",Error(error.response.data.msg))
      throw Error(error.response.data);
    });
};