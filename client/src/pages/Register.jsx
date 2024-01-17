import React from "react";
import Signup from "../components/auth/Signup";

const Register = () => {
  return (
    <main
      className="w-full h-screen flex flex-col bg-black-800 text-white-300 bg-cover bg-center"
      style={{ backgroundImage: 'url("/asset/background/bg.jpg")' }}
    >
      <div className="max-w-2xl mx-auto p-5 md:px-10 xl:px-0 w-[90%] flex flex-col  bg-black-700  items-center rounded-lg shadow-sm mt-20">
        <div>
          <img
            src="/asset/logo/logo-no-background.png"
            alt="logo"
            width={240}
            height={240}
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <Signup />
        </div>
      </div>
    </main>
  );
};

export default Register;
