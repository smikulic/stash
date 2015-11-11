'use strict';

import AppDispatcher from '../dispatcher.js';
import UserConstants from '../constants/UserConstants.jsx';

const ServerActionCreators = {
    receiveUserObject(userObject) {
        AppDispatcher.handleServerAction({
            actionType: UserConstants.USER_RECEIVE,
            userObject: userObject
        });
    }
};

export default ServerActionCreators;
