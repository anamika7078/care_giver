import { useEffect, useState } from "react";
import apiClient from "../api/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    apiClient
      .get(endpoint)
      .then((response) => {
        if (active) {
          setData(response.data);
        }
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;

