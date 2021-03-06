import Config from "../../config/config";
import axios from "../axios-interceptor";

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

export const AddRetroBoard = (board) => {
    var url = BaseApiUrl() + "/retro/AddRetroBoard";
    return axios.post(url, board);
};

export const AddRetroColumn = (column) => {
    var url = BaseApiUrl() + "/retro/AddRetroColumn";
    return axios.post(url, column);
};

export const UpdateRetroColumn = (column) => {
    var url = BaseApiUrl() + "/retro/UpdateRetroColumn";
    return axios.put(url, column);
};

export const UpdateRetroPoint = (point) => {
    var url = BaseApiUrl() + "/retro/UpdateRetroPoint";
    return axios.put(url, point);
};

export const DeleteRetroPoint = (point) => {
    var url = BaseApiUrl() + "/retro/DeleteRetroPoint";
    return axios.delete(url, { data: point });
};

export const DeleteRetroBoard = (boardId, userId) => {
    var url = BaseApiUrl() + "/retro/DeleteRetroBoard?boardId=" + boardId;
    return axios.delete(url, { data: new Number(userId) });
};

export const ShareBoard = (boardId, userEmail) => {
    var url =
        BaseApiUrl() +
        "/retro/AddUserToBoard?boardId=" +
        boardId +
        "&userEmail=" +
        userEmail;
    return axios.post(url);
};

export const GetSharedBoards = (userId) => {
    var url = BaseApiUrl() + "/retro/GetShareBoards?userId=" + userId;
    return axios.get(url);
};

export const UpdateRetroBoard = (board) => {
    var url = BaseApiUrl() + "/retro/UpdateRetroBoard";
    return axios.post(url, board);
};

export const GetBoardUsers = (boardId) => {
    var url = BaseApiUrl() + "/retro/GetBoardUsers?boardId=" + boardId;
    return axios.get(url);
};

export const AddRetroPointComment = (comment) => {
    var url = BaseApiUrl() + "/retro/AddRetroPointComment";
    return axios.post(url, comment);
};

export const UpdateRetroPointComment = (comment) => {
    var url = BaseApiUrl() + "/retro/UpdateRetroPointComment";
    return axios.put(url, comment);
};

export const DeleteRetroPointComment = (comment) => {
    var url = BaseApiUrl() + "/retro/DeleteRetroPointComment";
    return axios.delete(url, { data: comment });
};

export const DeleteRetroColumn = (column) => {
    var url = BaseApiUrl() + "/retro/DeleteRetroColumn";
    return axios.delete(url, { data: column });
};

function BaseApiUrl() {
    return Config.REACT_APP_BASE_API_URL;
}
