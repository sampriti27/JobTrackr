import React from "react";

const FormInput = ({ type, name, id, placeholder, value, setState }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-500 placeholder-gray-400 text-gray-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setState(e.target.value)}
        required
      />
    </div>
  );
};

export default FormInput;
