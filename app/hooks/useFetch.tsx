"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [apiData, setApiData] = useState<any[]>([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };
    fetchData();
    localStorage.setItem("data", JSON.stringify(apiData));
  }, [url]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
