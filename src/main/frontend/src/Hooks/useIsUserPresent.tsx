import { useContext } from "react";
import { AuthContext } from "Utils/AuthContext";
import usePresentList from "Hooks/usePresenceList";

const useIsUserPresent = (sessionId: number) => {
  const { credentials } = useContext(AuthContext);
  const { presentList, isLoading } = usePresentList(sessionId);

  return {
    isUserPresent:
      presentList &&
      presentList.some((user) => user.email === credentials?.email),
    isLoading,
  };
};

export default useIsUserPresent;
