import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    
  },
});

// Auth API's
export const login = (data) => api.post("/api/v1/auth/login", data);
export const register = (data) => api.post("/api/v1/auth/register", data);
export const getUser = () => api.get("/api/v1/user/get-user");
export const logout = () => api.get("/api/v1/auth/logout");

//Job API's
export const getJobs = () => api.get("/api/v1/job/get-jobs");
export const addJob = (data) => api.post("/api/v1/job/create-job", data);
export const deleteJob = (data) => api.delete(`/api/v1/job//delete-job/${data}`);
export const filterJobs = (params) => api.get( `/api/v1/job/get-jobs?page=${params.page}&status=${params.status}&workType=${params.workType}&sort=${params.sort}&search=${params.search}`);


api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if(error.response.status === 401 && error.config && !error.config._isRetry){
      originalRequest._isRetry = true;

      try {
          await axios.get(`http://localhost:8080/api/v1/auth/refresh`, {
              withCredentials : true
          });

          return api.request(originalRequest);

      } catch (error) {
          console.log(error.message);
      }
  }

  throw error;
})

export default api;
