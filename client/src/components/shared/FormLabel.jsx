import React from "react";

const FormLabel = ({ htmlFor, labelHeading }) => {
  return (
    <div>
      <label
        for={htmlFor}
        className="block mb-2 text-sm font-medium text-white"
      >
        {labelHeading}
      </label>
    </div>
  );
};

export default FormLabel;
