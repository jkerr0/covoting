import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useNumberParam = (paramName: string, navigateTo: string): number => {
  const param = useParams()[paramName];
  const navigate = useNavigate();
  const numberParam = Number(param);
  useEffect(() => {
    if (isNaN(numberParam)) {
        navigate(navigateTo);
    }
  }, [numberParam, navigate])
  return numberParam;
};

export default useNumberParam;
