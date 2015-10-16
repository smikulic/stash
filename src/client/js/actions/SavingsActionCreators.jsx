'use strict';

import AppDispatcher from '../dispatcher.js';
import SavingsConstants from '../constants/SavingsConstants.jsx';

const SavingsActionCreators = {
    setAddSavingModal (visible) {
        AppDispatcher.handleViewAction({
            actionType: SavingsConstants.SAVINGS_SET_MODAL,
            visible: visible
        });
    },
    addSaving (title, value, saved, due) {
        AppDispatcher.handleViewAction({
            actionType: SavingsConstants.SAVINGS_ADD,
            title: title,
            value: value,
            saved: saved,
            due: due
        });
    },
    deleteSaving (savingId) {
        AppDispatcher.handleViewAction({
            actionType: SavingsConstants.SAVINGS_DELETE,
            id: savingId
        });
    },
};

export default SavingsActionCreators;