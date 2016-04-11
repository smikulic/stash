'use strict';

import uuid from 'uuid';
import _ from 'lodash';
import AppDispatcher from '../dispatcher.js';
import SavingsConstants from '../constants/SavingsConstants.jsx';
import assign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _savingsObject = [];

let _addSavingModal = {
  active: false
};

const SavingsStore = assign({}, EventEmitter.prototype, {
  getSavingsData() {
    return _savingsObject;
  },

  getSavingModal() {
    return _addSavingModal;
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
SavingsStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;
  switch (action.actionType) {
    case SavingsConstants.SAVINGS_SET_MODAL:
      _addSavingModal.active = action.visible;
      SavingsStore.emitChange();
      break;

    case SavingsConstants.SAVINGS_DELETE:
      
      SavingsStore.emitChange();
      break;

    case SavingsConstants.USER_GOALS_RECEIVE:
      _savingsObject = action.userGoalsObject;
      SavingsStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in dispatcher.
});

export default SavingsStore;
