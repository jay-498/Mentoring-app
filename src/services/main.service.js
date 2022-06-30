import axios from "axios";
import { BASE_URL } from "../assets/js/config";

const discoverTopMentors = () => {
  return axios.get(`${BASE_URL}/api/mentor`);
};

const exploreConsultingCompanies = () => {
  return axios.get(`${BASE_URL}/api/company`);
};

const getCategories = () => {
  return axios.get(`${BASE_URL}/api/category`);
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

const sendCustomerEmail = (data) => {
  return axios.post(`${BASE_URL}/api/newsletter`, data);
};

export default {
  discoverTopMentors,
  exploreConsultingCompanies,
  getCollegeById,
  getMentorById,
  getCompanyById,
  getCategories,
  sendCustomerEmail,
};
