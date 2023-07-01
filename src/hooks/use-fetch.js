import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reqFetch = useCallback(async (reqConfig, applyData) => {
    setIsLoading(true);
    try {
      const res = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : 'GET',
        headers: reqConfig.headers ? reqConfig.headers : {},
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
      });
      if (!res.ok) { throw new Error('Cannot fetch data!'); }
      const data = await res.json();
      applyData(data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, reqFetch };
};

export default useFetch;