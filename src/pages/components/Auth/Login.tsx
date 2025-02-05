import React from "react";
import { PulseLoader } from "react-spinners";

interface Props {
  email: string;
  password: string;
  loading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  submitForm: () => void;
}

const Login = ({
  email,
  password,
  setEmail,
  setPassword,
  submitForm,
  loading,
}: Props) => {
  const isDisabled =
    loading ||
    !email ||
    !password ||
    !email.includes("@") ||
    !email.includes(".");

  return (
    <div className="md:p-0 p-3">
      <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
      <p className="text-center text-gray-500 mt-2">
        Please login to your account
      </p>
      <div className="mt-5">
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#ffd100]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#ffd100] mt-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => submitForm()}
          className={`w-full p-3 rounded-md text-white mt-3 ${
            isDisabled ? "bg-gray-500" : "bg-gray-800"
          }`}
          disabled={isDisabled}
        >
          {loading ? <PulseLoader size={10} color="#fff" /> : "Login"}
        </button>
        <div className="mt-5 text-center">
          <p className="text-gray-500">Don't have an account?</p>
          <a href="#" className="underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
