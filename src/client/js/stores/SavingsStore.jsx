'use strict';

import uuid from 'uuid';
import _ from 'lodash';
import AppDispatcher from '../dispatcher.js';
import SavingsConstants from '../constants/SavingsConstants.jsx';
import assign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _savingsObject = [
    {
        id: 1,
        title: "New laptop",
        price: 1200,
        initialSavings: 0,
        due: "2016-04-01"
    },
    {
        id: 2,
        title: "New glasses",
        price: 400,
        initialSavings: 200,
        due: "2015-12-01"
    },
    {
        id: 3,
        title: "Marriage documents",
        price: 400,
        initialSavings: 400,
        due: "2015-12-01"
    }
];

let _addSavingModal = {
    active: false
};

function _addSaving (title, value, saved, due) {
    _savingsObject.push({
        id: uuid.v4(),
        title: title,
        price: value,
        initialSavings: saved,
        due: due
    });
}

function _deleteSaving (id) {
    var index = _savingsObject.indexOf(id);
    console.log(_savingsObject, id)
    _savingsObject.splice(id, 1);
    //_.drop(_savingsObject, id);
    if (index > -1) {
        //_savingsObject.splice(index, 1);
    }
    console.log(_savingsObject)
}


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

        case SavingsConstants.SAVINGS_ADD:
            _addSaving(action.title, action.value, action.saved, action.due);
            SavingsStore.emitChange();
            break;

        case SavingsConstants.SAVINGS_DELETE:
            _deleteSaving(action.id);
            SavingsStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in dispatcher.
});

export default SavingsStore;