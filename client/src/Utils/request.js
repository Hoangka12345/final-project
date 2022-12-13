import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default request;
