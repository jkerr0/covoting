import { createContext } from "react";
import { Credentials, findCredentials } from "Services/auth-service";

interface AuthContextValue {
  credentials: Credentials | null;
  setCredentials: (c: Credentials | null) => void;
}
export const AuthContext = createContext<AuthContextValue>({
  credentials: findCredentials().credentials || null,
  setCredentials: () => {},
});
