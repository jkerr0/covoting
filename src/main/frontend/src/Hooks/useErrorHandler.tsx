import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteCredentials } from "Services/auth-service";
import { AuthContext } from "Utils/AuthContext";

const useErrorHandler = (errorParam?: AxiosError | null) => {
  const [error, setError] = useState<AxiosError | undefined>();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const authContext = useContext(AuthContext)
  useEffect(() => {
    errorParam && setError(errorParam);
  }, [errorParam]);

  useEffect(() => {
    if (!error) {
      return;
    } else if (error.response && error.response.status === 401) {
      deleteCredentials();
      authContext.setCredentials(null)
      queryClient.invalidateQueries();
      setError(undefined);
      navigate("/login", { state: { tokenExpired: true } });
    } else {
      console.error(error);
      setError(undefined);
      navigate("/error");
    }
  }, [error, navigate]);
  return setError;
};

export default useErrorHandler;
