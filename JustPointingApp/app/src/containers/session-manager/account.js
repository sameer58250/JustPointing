import Config from "../../config/config";
import axios from "../axios-interceptor";

export const LoginUser = (credentials) => {
    var url = BaseApiUrl() + "/Login/Login";
    return axios.post(url, credentials, {
        headers: { "content-type": "application/json" },
    });
};

export const SearchUsers = (email) => {
    var url = BaseApiUrl() + "/Account/SearchUsers?text=" + email;
    return axios.get(url)
}

export const RegisterUser = (user) => {
    var url = BaseApiUrl() + "/Login/RegisterUser";
    return axios.post(url, user);
}

function BaseApiUrl() {
    return Config.REACT_APP_BASE_API_URL;
}
