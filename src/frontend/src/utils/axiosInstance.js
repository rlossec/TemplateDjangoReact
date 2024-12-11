import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { CONFIG } from "../config";

const { API_URL } = CONFIG;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const { refreshAccessToken, setTokens, clearTokens } =
      useAuthStore.getState();

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token is not available.");
        }
        const response = await refreshAccessToken(refreshToken);
        console.log(response);
        setTokens(response.access, refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${response.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token", refreshError);
        clearTokens();
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
