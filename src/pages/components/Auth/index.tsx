import React, { useState, useEffect } from "react";
import Login from "./Login";
import OTP from "./OTP";

const AuthComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const submitForm = async () => {
    setLoading(true);
    setError("");
    setShowError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoading(false);
    setEmail("");
    setPassword("");

    if (data.auth) {
      setIsLoggedIn(true);
    } else {
      setError(data.error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (timer === 0) {
      setIsLoggedIn(false);
      setOtp("");
    }
  }, [timer]);

  return (
    <div className="bg-[#eff1f3] md:w-3/6 w-full h-full flex justify-center items-center flex-col">
      {!isLoggedIn ? (
        <Login
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          submitForm={submitForm}
          loading={loading}
        />
      ) : (
        <OTP
          loading={loading}
          timer={timer}
          setTimer={setTimer}
          setLoading={setLoading}
        />
      )}
      <div className="h-16 mt-10">
        {showError && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative transition-opacity duration-500 ${
              showError ? "opacity-100" : "opacity-0"
            }`}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
