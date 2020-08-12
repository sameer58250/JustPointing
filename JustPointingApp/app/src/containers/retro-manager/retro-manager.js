import Config from "../../config/config";
import axios from "axios";

export const GetRetroBoardsOfUser = (userId) => {
  var url = BaseApiUrl() + "/retro/GetRetroBoardsOfUser?userId=" + userId;
  return axios.get(url);
};

export const GetRetroColumns = (boardId) => {
  var url = BaseApiUrl() + "/retro/GetRetroColumns?boardId=" + boardId;
  return axios.get(url);
};

export const PostRetroPoint = (retroPoint) => {
  var url = BaseApiUrl() + "/retro/AddRetroPoint";
  return axios.post(url, retroPoint);
};

function BaseApiUrl() {
  return Config.REACT_APP_BASE_API_URL;
}
