export enum UserType {
  ADMIN = "ADMIN",
  VOTER = "VOTER",
}
export interface Credentials {
  jwtToken: string;
  tokenType: string;
  userType: UserType;
}

export interface OptionalCredentials {
  credentials?: Credentials;
}

const credentialsKey = "credentials"

export const storeCredentials = (creds: Credentials): void => {
  localStorage.setItem(credentialsKey, JSON.stringify(creds));
};

export const deleteCredentials = () => {
  localStorage.removeItem(credentialsKey);
};

export const findCredentials = (): OptionalCredentials => {
  const storedCredentials = localStorage.getItem(credentialsKey);
  if (!storedCredentials) {
    return {};
  }
  const credentials: Credentials = JSON.parse(storedCredentials);
  return { credentials };
};

export const hasCredentials = (): boolean => {
  return !!findCredentials().credentials;
};

export const getAuthorizationHeader = (): string => {
  const creds = findCredentials()?.credentials;
  if (creds) {
    return `${creds.tokenType} ${creds.jwtToken}`;
  } else {
    return "";
  }
};
