import axios from 'axios'
import { getAuthorizationHeader } from './Services/auth-service';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        Authorization: getAuthorizationHeader()
    }
})

export default axiosInstance;