import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, setFilterParams, setJobs, setSuccess } from "../../feature/jobs/jobSlice";
import { filterJobs } from '../../http';

const Search = () => {
    const dispatch = useDispatch();
  const params = useSelector((state) => state.job.filterParams);

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value;
    dispatch(setFilterParams({search: searchValue}));
  };
  
  const handleSearch = async () => {
    // console.log(params);

    try {
      const {data} = await filterJobs(params);

      console.log(data);
      dispatch(setSuccess(data));
      dispatch(setJobs(data));
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(resetSearch());
    }

  }
  return (
    <>
    <input
            type="search"
            name="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-white-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search by position"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={params.search}
            onChange={handleSearchInputChange}

          />

          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 cursor-pointer"
            id="basic-addon2"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-white-300"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          </>
  )
}

export default Search