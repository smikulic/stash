'use strict';

import AppDispatcher from '../dispatcher.js';
import SavingsConstants from '../constants/SavingsConstants.jsx';

const SavingsActionCreators = {
    setAddSavingModal (visible) {
        AppDispatcher.handleViewAction({
            actionType: SavingsConstants.SAVINGS_SET_MODAL,
            visible: visible
        });
    }
};

export default SavingsActionCreators;