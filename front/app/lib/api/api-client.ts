import axios from "axios";
import { API_GENERAL } from "../constants";

const apiClient = axios.create({
  baseURL: API_GENERAL,
});
// TODO: redirect if  status 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("NO SESSIONS");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
