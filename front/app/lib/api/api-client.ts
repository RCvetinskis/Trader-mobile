import axios, { AxiosRequestConfig } from "axios";
import { API_GENERAL } from "../constants";
import { useAuthStore } from "../../stores/auth-store";
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuthInterceptor?: boolean;
}
const apiClient = axios.create({
  baseURL: API_GENERAL,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest?.skipAuthInterceptor) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.log("NO SESSIONS");

      const authStore = useAuthStore.getState();
      await authStore.logout();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
