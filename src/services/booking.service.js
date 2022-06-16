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

export const mentorAvailability = (id) => {
  return axios.get(`${BASE_URL}/api/mentoravailability?mentor=${id}`);
};

export const mentorSearch = (query) => {
  return axios.get(`${BASE_URL}/api/mentor/search?q=${query}`);
};

export const getAllSlots = ({type}) => {
  const jwt_token = localStorage.getItem("user_token");
  let endPoint=""
  if(type==='U'){
    endPoint="?type=U"
  }else if(type==='P'){
    endPoint="?type=P"
  }

  return axios.get(`${BASE_URL}/api/event${endPoint}`,{headers : {
    'x-auth-token' : jwt_token
  }})
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    throw Error(error.response.data.msg);
  });
};

