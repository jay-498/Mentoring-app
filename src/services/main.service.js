import axios from "axios";
import { BASE_URL } from "../assets/js/config";

const discoverTopMentors = () => {
  return axios.get(`/api/mentor`);
};

const exploreConsultingCompanies = () => {
  return axios.get(`/api/company`);
};

const getCollegeById = (id) => {
  return axios.get(`/api/college/${id}`);
};

const getMentorById = (id) => {
  return axios.get(`/api/mentor/${id}`);
};

const getCompanyById = (id) => {
  return axios.get(`/api/company/${id}`);
};

export default {
  discoverTopMentors,
  exploreConsultingCompanies,
  getCollegeById,
  getMentorById,
  getCompanyById,
};
