import React, { useEffect, useState } from "react";
import { Navbar } from "../components/shared";
import Modal from "../components/createModal/Modal";
import { getJobs } from "../http";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setSuccess } from "../feature/jobs/jobSlice";
import Table from "../components/table/Table";
import Pagination from "../components/pagination/Pagination";
import Category from "../components/category/Category";
import Search from "../components/shared/Search";
import Drawer from "../components/drawer/Drawer";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job.jobs);

  const totalJobs = useSelector((state) => state.job.totalJobs);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const getAllJobsData = async () => {
    try {
      const { data } = await getJobs();
      console.log("geting job api:", data);
      dispatch(setSuccess(data));
      dispatch(setJobs(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobsData();
  }, []);

  return (
    <>
      <Navbar toggleDrawer={toggleDrawer}/>
    
      <section className=" relative w-full h-full text-white-300">
        <Category />
        <div className="w-full flex items-center justify-between sm:justify-end px-4 md:px-16 py-0 sm:py-3 pt-20 sm:pt-2 ">
          <div className="flex sm:hidden items-center w-[60%] xs:w-[80%]">
          <Search />
          </div>
         <div className="flex items-center">
         <button
            data-modal-target="top-right-modal"
            data-modal-toggle="top-right-modal"
            className="bg-green-550 hover:bg-green-600 text-white-300  font-semibold px-2.5 py-2 rounded-md  flex items-center gap-1 cursor-pointer sm:mt-4"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Job
          </button>
         </div>
          {showModal && (
            <Modal
              setShowModal={setShowModal}
              getAllJobsData={getAllJobsData}
            />
          )}
        </div>

        {/* table for jobs  */}
        {totalJobs === 0 ? (
          <div className="w-screen flex items-center justify-center px-10">
            <p className="text-white-300 text-xl tracking-tighter font-semibold text-center">
              Your dashboard is waiting for your career adventures! Add your
              first job now.
            </p>
          </div>
        ) : (
          <Table jobs={jobs} getAllJobsData={getAllJobsData} />
        )}
        <div className="my-8 w-full flex items-center justify-center">
          <Pagination />
        </div>
        <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      </section>
   
    </>
  );
};

export default Dashboard;
