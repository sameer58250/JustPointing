import axios from "axios";
import { Cookies } from "react-cookie";

const axiosInstance = axios.create();
var cookies = new Cookies();
axiosInstance.interceptors.request.use(
    (config) => {
        var userInfo = cookies.get("userdetails");
        var token = "";
        if (userInfo) {
            token = userInfo.userEmail + ":" + userInfo.password;
        }
        config.headers.authorization = "Basic " + btoa(token);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
