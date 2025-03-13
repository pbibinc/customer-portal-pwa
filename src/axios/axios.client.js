import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_BASE_URL
    : process.env.REACT_APP_PROD_BASE_URL;

const axiosClient = axios.create({
  baseURL,
});
console.log("Environment Variables:", process.env);

console.log("baseURL", baseURL);

export default axiosClient;
