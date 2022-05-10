import axios from "axios";
import { BASE_URL } from "../assets/js/config";

const discoverTopMentors = () => {
  return axios.get(`${BASE_URL}/api/mentor`);
};

const exploreConsultingCompanies = () => {
  return axios.get(`${BASE_URL}/api/company`);
};

const getCollegeById = (id) => {
  return axios.get(`${BASE_URL}/api/college/${id}`);
};

const getMentorById = (id) => {
  return axios.get(`${BASE_URL}/api/mentor/${id}`);
};

const getCompanyById = (id) => {
  return axios.get(`${BASE_URL}/api/company/${id}`);
};

export default {
  discoverTopMentors,
  exploreConsultingCompanies,
  getCollegeById,
  getMentorById,
  getCompanyById,
};
