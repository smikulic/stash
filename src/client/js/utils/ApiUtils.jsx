'use strict';

import ServerActionCreators from '../actions/ServerActionCreators.jsx';
import { get, post } from './XhrUtils.jsx';

let baseUrl = window.location.host;

export default {
    /**
     * Call to get the current user object.
     * This is called right after log in.
     */
    retrieveUserObject() {
        const url = `http://${baseUrl}/api/users/:user_email`;
        get(url).then(function(response) {
            ServerActionCreators.receiveUserObject(response.data);
        }, function (error) {
            console.error("Failed to retrieve user data!", error);
        });
    }
};
