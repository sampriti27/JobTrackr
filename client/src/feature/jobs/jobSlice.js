import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
  totalJobs: 0,
  jobs: [],
  numOfPage: 0,
  filterParams: {
    status: "all",
    workType: "all",
    sort: "latest",
    search: "",
    page: 1,
    limit: 10,
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {
    setSuccess: (state, action) => {
      const { success } = action.payload;
      state.isSuccess = success;
    },

    setJobs: (state, action) => {
      const { totalJobs, jobs, numOfPage } = action.payload;
      state.totalJobs = totalJobs;
      state.jobs = jobs;
      state.numOfPage = numOfPage;
    },
    setFilterParams: (state, action) => {
      const filterParams = action.payload;
      state.filterParams = { ...state.filterParams, ...filterParams };
    },
    resetSearch: (state) => {
      state.filterParams.search = "";
    },
}
});

export const { setSuccess, setJobs, setFilterParams, resetSearch} = jobSlice.actions;

export default jobSlice.reducer;
