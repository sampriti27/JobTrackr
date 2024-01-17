import React from "react";
import DotLoader from "react-spinners/DotLoader";

const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen bg-black-700 flex flex-col justify-center items-center  gap-4">
      <DotLoader color="#299a2e" size={80} />
      <p className="text-2xl text-white-300 font-semibold">
        Loading your job quest hub....
      </p>
    </div>
  );
};

export default FullScreenLoader;
