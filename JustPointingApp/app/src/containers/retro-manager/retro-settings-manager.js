import Config from "../../config/config";
import axios from "../axios-interceptor";

export const AddRetroBoardTemplate = (template) => {
    var url = BaseApiUrl() + "/RetroSettings/AddRetroBoardTemplate";
    return axios.post(url, template);
};

export const DeleteRetroBoardTemplate = (template) => {
    var url = BaseApiUrl() + "/RetroSettings/DeleteRetroBoardTemplate";
    return axios.delete(url, { data: template });
};

export const UpdateRetroBoardTemplateName = (template) => {
    var url = BaseApiUrl() + "/RetroSettings/UpdateRetroBoardTemplateName";
    return axios.put(url, template);
};

export const SetDefaultTemplate = (template) => {
    var url = BaseApiUrl() + "/RetroSettings/SetDefaultTemplate";
    return axios.post(url, template);
};

export const AddRetroBoardTemplateColumn = (templateColumn) => {
    var url = BaseApiUrl() + "/RetroSettings/AddRetroBoardTemplateColumn";
    return axios.post(url, templateColumn);
};

export const DeleteRetroBoardTemplateColumn = (templateColumn) => {
    var url = BaseApiUrl() + "/RetroSettings/DeleteRetroBoardTemplateColumn";
    return axios.delete(url, { data: templateColumn });
};

export const UpdateRetroBoardTemplateColumn = (templateColumn) => {
    var url = BaseApiUrl() + "/RetroSettings/UpdateRetroBoardTemplateColumn";
    return axios.put(url, templateColumn);
};

export const AddRetroBoardTemplateUser = (templateUser) => {
    var url = BaseApiUrl() + "/RetroSettings/AddRetroBoardTemplateUser";
    return axios.post(url, templateUser);
};

export const DeleteRetroBoardTemplateUser = (templateUser) => {
    var url = BaseApiUrl() + "/RetroSettings/DeleteRetroBoardTemplateUser";
    return axios.delete(url, { data: templateUser });
};

export const GetRetroBoardTemplates = (userId) => {
    var url =
        BaseApiUrl() + "/RetroSettings/GetRetroBoardTemplates?userId=" + userId;
    return axios.get(url);
};

function BaseApiUrl() {
    return Config.REACT_APP_BASE_API_URL;
}
