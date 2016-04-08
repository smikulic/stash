'use strict';

import uuid from 'uuid';
import _ from 'lodash';
import AppDispatcher from '../dispatcher.js';
import UserConstants from '../constants/UserConstants.jsx';
import assign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _userObject = {};

function _addUserName() {
  if (_userObject.email) {
    let nameMatch = _userObject.email.match(/^([^@]*)@/);
    _userObject.username = nameMatch ? nameMatch[1] : null;
  }
}


const UserStore = assign({}, EventEmitter.prototype, {
  getUser() {
    _addUserName();
    return _userObject;
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
UserStore.dispatchToken = AppDispatcher.register(function (payload) {
  const action = payload.action;
  switch (action.actionType) {
    case UserConstants.USER_RECEIVE:
      _userObject = action.userObject;
      UserStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in dispatcher.
});

export default UserStore;
