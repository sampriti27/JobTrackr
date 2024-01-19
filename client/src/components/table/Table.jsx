import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { deleteJob } from "../../http";

const Table = ({ jobs, getAllJobsData }) => {
  const formatCreatedAtDistance = (d) => {
    const date = new Date(d);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await deleteJob(id);
      enqueueSnackbar(data.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      getAllJobsData();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
  return (
    <div className="mt-4 px-4 md:px-16">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs  uppercase bg-gray-50  text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Work type
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3 sr-only">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="odd:bg-black-650 even:bg-gray-50  border-b "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white-300 whitespace-nowrap "
                  >
                    {item.company}
                  </th>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4">
  <span className={`${item.workType === "full-time" ? "bg-gray-700 text-blue-400 border border-blue-400" : item.workType === "part-time" ? "bg-gray-700 text-indigo-400 border border-indigo-400" : item.workType === "internship" ? "bg-gray-700 text-purple-400 border border-purple-400" : "bg-gray-700 text-pink-400 border border-pink-400"} text-sm font-medium me-2 px-2.5 py-1 flex justify-center items-center rounded border border-blue-400`}>
    {item.workType}
  </span>
</td>
                  <td className="px-6 py-4">{item.workLocation}</td>
                  <td className="px-6 py-4"><span className={`${
                      item.status === "interview"
                        ? "bg-green-900 text-green-300"
                        : item.status === "reject"
                        ? "bg-red-900 text-red-300"
                        : "bg-yellow-900 text-yellow-300"
                    } text-sm font-medium me-2 px-2.5 py-1  flex justify-center items-center rounded`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {formatCreatedAtDistance(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium  hover:underline flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 hover:text-green-600 cursor-pointer"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
