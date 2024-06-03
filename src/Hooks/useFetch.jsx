import React, { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const request = useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      setData(json)
      // console.log (json.message);
      // console.log (response.ok);
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      setError(json.message);
      json = null;
    } finally {
      setTimeout(()=>{
        setLoading(false);
      },0)
      return { response, json, data,error };
    }
  }, []);
  return {
    data,
    loading,
    error,
    setError,
    request,
    setLoading
  };
};

export default useFetch;