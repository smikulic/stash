'use strict';

import AppDispatcher from '../dispatcher.js';
import IncomesConstants from '../constants/IncomesConstants.jsx';
import ApiUtils from '../utils/ApiUtils.jsx';

const IncomesActionCreators = {
  loadIncomes () {
    ApiUtils.retrieveUserIncomesObject();
  },
  setAddIncomeModal (visible) {
    AppDispatcher.handleViewAction({
      actionType: IncomesConstants.INCOMES_SET_MODAL,
      visible: visible
    });
  },
  addIncome (params) {
    ApiUtils.addUserIncome(params);
  },
  deleteIncome (incomeId) {
    AppDispatcher.handleViewAction({
      actionType: IncomesConstants.INCOMES_DELETE,
      id: incomeId
    });
    ApiUtils.removeUserIncome(incomeId);
  },
};

export default IncomesActionCreators;
