import axiosInstance from "Utils/axios-instance"
import { Credentials } from "./auth-service";

export interface LoginData {
    email: string,
    password: string
}

export const postLogin = async (loginData: LoginData): Promise<Credentials> => {
    const response = await axiosInstance.post('auth/login', loginData);
    return response.data;
}