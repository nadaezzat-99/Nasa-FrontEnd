import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
const interceptorInstance = axios.create();

interceptorInstance.interceptors.request.use(
  (config) => {
    config.baseURL = `${process.env.REACT_APP_BASE_API_URL}`;
    config.withCredentials = true;
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = cookies.get("token");
    } else {
      useNavigate("/signin");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default interceptorInstance;
