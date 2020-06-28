import React from 'react';
import Config from '../../config/config';
import axios from 'axios';

export const StartSession = sessionId => {

    const BaseApiUrl = Config.REACT_APP_BASE_API_URL;

    var url = BaseApiUrl + '/Home/StartSession' + (sessionId ? '/' + sessionId : '');

    return axios.get(url);
}