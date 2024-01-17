import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
  },
});

// Auth API's
export const login = (data) => api.post("/api/v1/auth/login", data);
export const register = (data) => api.post("api/v1/auth/register", data);
export const getUser = () => api.get("api/v1/user/get-user");
export const logout = () => api.get("api/v1/auth/logout");

//Job API's
export const getJobs = () => api.get("api/v1/job/get-jobs");
export const addJob = (data) => api.post("api/v1/job/create-job", data);

export default api;
