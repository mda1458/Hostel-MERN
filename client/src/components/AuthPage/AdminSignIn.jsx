import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminSignIn() {
  const [inputId, setInputId] = useState("");
  const [pass, setPass] = useState("");

  const changeCms = (event) => {
    setInputId(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const id = {
    name: "id",
    type: "number",
    placeholder: "000000",
    req: true,
    onChange: changeCms,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Sign in to your account - Manager
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <Input field={id} />
          <Input field={password} />
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-400">
            You're a student?{" "}
            <Link
              to="request"
              className="font-medium hover:underline text-blue-500"
            >
              SignIn Here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
