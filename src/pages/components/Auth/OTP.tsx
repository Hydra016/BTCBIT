import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { PulseLoader } from "react-spinners";

interface Props {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTP = ({ timer, setTimer, loading, setLoading }: Props) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, setTimer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleReset = () => {
    setTimer(60);
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      const result = await response.json();
      setLoading(false);
      localStorage.setItem("auth", "true");
      setLoggedIn(true);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="md:p-0 p-3">
      <h1 className="text-center text-2xl font-bold">
        Enter verification code
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Enter the OTP sent to your registered phone number to proceed
      </p>
      <div className="flex justify-between mt-4 w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-12 h-12 text-center border border-gray-300 rounded"
          />
        ))}
      </div>
      <button
        onClick={() => verifyOtp()}
        className={`w-full p-3 rounded-md text-white mt-10 ${
          isOtpComplete ? "bg-gray-800" : "bg-gray-500"
        }`}
        disabled={!isOtpComplete}
      >
        {loading ? <PulseLoader size={10} color="#fff" /> : "Verify"}
      </button>
      <div className="mt-4 flex justify-center">
        <div>
          <span onClick={handleReset} className="cursor-pointer underline">
            Resend
          </span>{" "}
          code in {timer}
        </div>
      </div>
    </div>
  );
};

export default OTP;
