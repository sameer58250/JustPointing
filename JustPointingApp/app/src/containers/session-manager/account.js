import Config from "../../config/config";
import axios from "axios";

export const LoginUser = (credentials) => {
    var url = BaseApiUrl() + "/Login/Login";
    return axios.post(url, new String(credentials), {
        headers: { "content-type": "application/json" },
    });
};

function BaseApiUrl() {
    return Config.REACT_APP_BASE_API_URL;
}
