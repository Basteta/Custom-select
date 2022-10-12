import { useState, useEffect } from "react";

import { Option } from "../components/List";
interface ApiResponse {
  data: Option[];
  error: Error | undefined;
  loading: Boolean;
}

const API_URL = "https://contactify-api.herokuapp.com/api/contacts";

export const useAPI = (): ApiResponse => {
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async (): Promise<void> => {
    setLoading(true);
    try {
      const apiResponse = await fetch(API_URL);
      const json = await apiResponse.json();
      setData(json);
    } catch (err) {
      setError(err as Error);
    }
    setLoading(false);
  };

  useEffect(() => {
    void getAPIData();
  }, []);

  return { data, error, loading };
};
