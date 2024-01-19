import React, { useState } from "react";
import { Button, FormInput, FormLabel } from "../shared";
import { Link } from "react-router-dom";
import { login } from "../../http";
import { isValidEmail } from "../../utils";
import { useDispatch } from "react-redux";
import { setAuth } from "../../feature/user/userSlice";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
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

    try {
      setLoading(true);
      const { data } = await login({ email, password });
      //set user data in redux store
      dispatch(setAuth(data));

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
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="max-w-sm p-4  rounded-lg sm:p-6 md:p-8 bg-black-700 w-[100%] ">
      <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-white text-center">
          Sign in to our platform
        </h5>
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
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-blue-300 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
              />
            </div>

            <label
              for="remember"
              className="ms-2 text-sm font-medium  text-gray-300"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="ms-auto text-sm  hover:underline text-indigo-500"
          >
            Forgot Password?
          </a>
        </div>
        <Button
          content="Login to your account"
          handleInput={handleLogin}
          isloading={loading}
        />
        <div className="text-sm font-medium text-gray-300">
          Not registered?
          <Link to="/register" className="hover:underline text-indigo-500 ml-1">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
