import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoonLoader } from "react-spinners";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/notFound");
        const result = await response.json();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <MoonLoader />
      ) : (
        <Image src="/notFound.jpg" alt="Not Found" width={500} height={500} />
      )}
    </div>
  );
};

export default NotFound;
