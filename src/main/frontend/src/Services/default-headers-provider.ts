import { AxiosRequestConfig } from "axios";
import { getAuthorizationHeader } from "./auth-service";

const getHeadersConfig = (): AxiosRequestConfig => {
    return {
        headers: {
            Authorization: getAuthorizationHeader()
        }
    }
};

export default getHeadersConfig;
