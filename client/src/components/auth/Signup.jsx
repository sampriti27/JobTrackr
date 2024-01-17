import React, { useState } from "react";
import { Button, FormInput, FormLabel } from "../shared";
import { Link } from "react-router-dom";
import { register } from "../../http";
import { isValidEmail } from "../../utils";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    //validate
    if (!name || !email || !password) {
      enqueueSnackbar("Please fill all the fileds!", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }

    if (!isValidEmail(email)) {
      enqueueSnackbar("Please enter a valid email-id!", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await register({ name, email, password });
      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      navigate("/");
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
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="max-w-sm p-4  rounded-lg sm:p-6 md:p-8 bg-black-700 w-[100%] ">
      <form className="space-y-4" action="#">
        <h5 className="text-xl font-medium text-white text-center">
          Create an Account
        </h5>
        <div>
          <FormLabel htmlFor="name" labelHeading="Your name" />
          <FormInput
            type="text"
            name="name"
            id="name"
            value={name}
            setState={setName}
            placeholder="John Doe"
          />
        </div>
        <div>
          <FormLabel htmlFor="email" labelHeading="Your email" />
          <FormInput
            type="email"
            name="email"
            id="email"
            value={email}
            setState={setEmail}
            placeholder="name@company.com"
          />
        </div>
        <div>
          <FormLabel htmlFor="password" labelHeading="Your password" />
          <FormInput
            type="password"
            name="password"
            id="password"
            value={password}
            setState={setPassword}
            placeholder="••••••••"
          />
        </div>

        <Button
          content="Create your account"
          handleInput={handleSignup}
          isloading={loading}
        />
        <div className="text-sm font-medium text-gray-300">
          Already registered?
          <Link to="/" className="hover:underline text-indigo-500 ml-1">
            Signin
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
