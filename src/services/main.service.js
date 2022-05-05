import axios from "axios";
import { BASE_URL } from "../assets/js/config";

const discoverTopMentors = () => {
  return axios.get("https://intense-stream-21467.herokuapp.com/api/mentor");
};

const exploreConsultingCompanies = () => {
  return axios.get("https://intense-stream-21467.herokuapp.com/api/company");
};

const getCollegeById = (id) => {
  return axios.get(
    `https://intense-stream-21467.herokuapp.com/api/college/${id}`
  );
};

const getMentorById = (id) => {
  return axios.get(
    `https://intense-stream-21467.herokuapp.com/api/mentor/${id}`
  );
};

const getCompanyById = (id) => {
  return axios.get(
    `https://intense-stream-21467.herokuapp.com/api/company/${id}`
  );
};

export default {
  discoverTopMentors,
  exploreConsultingCompanies,
  getCollegeById,
  getMentorById,
  getCompanyById,
};
