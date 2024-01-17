import React, { useState } from "react";
import { addJob } from "../../http";
import { enqueueSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";

const Modal = ({ setShowModal, getAllJobsData }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    workLocation: "",
    workType: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  // Update form data as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await addJob(JSON.stringify(formData));
      getAllJobsData();
      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } finally {
      setLoading(false);
      setFormData({
        companyName: "",
        position: "",
        location: "",
        workType: "",
        status: "",
      });
      setShowModal(false);
    }
  };

  return (
    <div className="">
      <div
        id="top-right-modal"
        data-modal-placement="top-right"
        tabindex="-1"
        className="fixed top-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
      >
        <div className="relative p-4 w-full max-w-md max-h-full mx-auto top-1/2 transform -translate-y-1/2">
          <div className="relative  rounded-lg shadow bg-black-650">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-300">
                Add New Job
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium  text-gray-300"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="E.g Google"
                    value={formData.company}
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="position"
                    className="block mb-2 text-sm font-medium  text-gray-300"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="E.g Software Developer 1"
                    value={formData.position}
                    onChange={handleChange}
                    required=""
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="workType"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Work-Type
                  </label>
                  <select
                    id="workType"
                    name="workType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.workType}
                    onChange={handleChange}
                  >
                    <option value="">Select work-type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                    <option value="contract-based">Contract-based</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    for="status"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="reject">Rejected</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    for="location"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="workLocation"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="E.g India"
                    value={formData.workLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center items-center">
                <button
                  type="button"
                  className="text-white inline-flex items-center bg-green-550 hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <PulseLoader color="#eef1f0" size={16} />
                  ) : (
                    <>
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Add new job
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
