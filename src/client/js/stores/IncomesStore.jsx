'use strict';

import uuid from 'uuid';
import _ from 'lodash';
import AppDispatcher from '../dispatcher.js';
import IncomesConstants from '../constants/IncomesConstants.jsx';
import assign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _incomesObject = [];

let _addIncomeModal = {
  active: false
};

const IncomesStore = assign({}, EventEmitter.prototype, {
  getIncomesData() {
    return _incomesObject;
  },

  getIncomeModal() {
    return _addIncomeModal;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
IncomesStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;
  switch (action.actionType) {
    case IncomesConstants.INCOMES_SET_MODAL:
      _addIncomeModal.active = action.visible;
      IncomesStore.emitChange();
      break;

    case IncomesConstants.INCOMES_DELETE:
      
      IncomesStore.emitChange();
      break;

    case IncomesConstants.USER_INCOMES_RECEIVE:
      _incomesObject = action.userIncomesObject;
      IncomesStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in dispatcher.
});

export default IncomesStore;
