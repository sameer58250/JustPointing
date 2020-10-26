import axios from "axios";
import { Cookies } from "react-cookie";

const axiosInstance = axios.create();
var cookies = new Cookies();
axiosInstance.interceptors.request.use(
    (config) => {
        var token = cookies.get("token");
        config.headers.authorization = token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
