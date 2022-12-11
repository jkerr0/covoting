import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCredentials } from "Services/auth-service";

const useErrorHandler = (errorParam?: AxiosError | null) => {
  const [error, setError] = useState<AxiosError | undefined>();
  const navigate = useNavigate();
  useEffect(() => {
    errorParam && setError(errorParam);
  }, [errorParam]);

  useEffect(() => {
    if (!error) {
      return;
    } else if (error.response && error.response.status === 401) {
      deleteCredentials();
      navigate("/login", { state: { tokenExpired: true } });
    } else {
      console.error(error);
      navigate("/error");
    }
  }, [error, navigate]);
  return setError;
};

export default useErrorHandler;
