'use strict';

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
        due: "Apr 01 2016 00:00:00 GMT+0200 (CEST)"
    },
    {
        id: 2,
        title: "New glasses",
        price: 400,
        initialSavings: 200,
        due: "Dec 01 2015 00:00:00 GMT+0200 (CEST)"
    },
    {
        id: 3,
        title: "Marriage documents",
        price: 400,
        initialSavings: 400,
        due: "Dec 01 2015 00:00:00 GMT+0200 (CEST)"
    }
];

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

        case SavingsConstants.SAVINGS_ADD:
            console.log('savings add')
            SavingsStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in dispatcher.
});

export default SavingsStore;