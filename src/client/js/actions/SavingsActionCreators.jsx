'use strict';

import AppDispatcher from '../dispatcher.js';
import SavingsConstants from '../constants/SavingsConstants.jsx';
import ApiUtils from '../utils/ApiUtils.jsx';

const SavingsActionCreators = {
  loadSavingsGoals () {
    ApiUtils.retrieveUserGoalsObject();
  },
  setAddSavingModal (visible) {
    AppDispatcher.handleViewAction({
      actionType: SavingsConstants.SAVINGS_SET_MODAL,
      visible: visible
    });
  },
  addSavingsGoal (params) {
    ApiUtils.addUserSavingsGoal(params);
  },
  deleteSaving (savingId) {
    AppDispatcher.handleViewAction({
      actionType: SavingsConstants.SAVINGS_DELETE,
      id: savingId
    });
  }
};

export default SavingsActionCreators;
