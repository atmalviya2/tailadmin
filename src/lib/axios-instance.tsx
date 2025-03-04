import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth data
      Cookies.remove("token");
      localStorage.removeItem("user");
      
      // Get current location
      const currentPath = window.location.pathname;
      const isAuthPath = ['/auth/signin', '/auth/signup'].includes(currentPath);
      
      if (!isAuthPath) {
        // Redirect to login with return URL
        const returnTo = encodeURIComponent(currentPath);
        window.location.href = `/auth/signin?returnTo=${returnTo}`;
      }
    }
    return Promise.reject(error);
  }
);