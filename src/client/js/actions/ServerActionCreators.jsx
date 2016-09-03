'use strict';

import AppDispatcher from '../dispatcher.js';
import UserConstants from '../constants/UserConstants.jsx';
import SavingsConstants from '../constants/SavingsConstants.jsx';
import IncomesConstants from '../constants/IncomesConstants.jsx';

const ServerActionCreators = {
  receiveUserObject(userObject) {
    AppDispatcher.handleServerAction({
      actionType: UserConstants.USER_RECEIVE,
      userObject: userObject
    });
  },
  receiveUserGoalsObject(userGoalsObject) {
    AppDispatcher.handleServerAction({
      actionType: SavingsConstants.USER_GOALS_RECEIVE,
      userGoalsObject: userGoalsObject
    });
  },
  receiveUserIncomesObject(userIncomesObject) {
    AppDispatcher.handleServerAction({
      actionType: IncomesConstants.USER_INCOMES_RECEIVE,
      userIncomesObject: userIncomesObject
    });
  },
};

export default ServerActionCreators;
