import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  // console.log("baseurl", baseURL)
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (value) => {
    return value;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const currentPath = window.location.pathname;
      const publicPaths = [
        '/signin',
        '/register',
      ];

      const isPublicPath = publicPaths.some(path =>
        currentPath === path || currentPath.startsWith(path + '/')
      );

      if (status === 401 || status === 403) {
        if (!isPublicPath) {
          Cookies.remove("token");
          // Redirect instead of reload to prevent loops
          const returnTo = encodeURIComponent(currentPath);
          window.location.href = `/signin?returnTo=${returnTo}`;
        }
      }
    }
    throw error;
  },
);