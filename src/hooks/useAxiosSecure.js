import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// 🔐 Add interceptor to attach token before each request
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
