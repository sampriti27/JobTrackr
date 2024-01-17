import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import jobReducer from "../feature/jobs/jobSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    job: jobReducer,
  },
});
