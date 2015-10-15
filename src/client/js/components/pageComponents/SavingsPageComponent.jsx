'use strict';

import React from 'react/addons';
import _ from 'lodash';
import uuid from 'uuid';
import SavingsStore from '../../stores/SavingsStore.jsx';
import SavingsActionCreators from '../../actions/SavingsActionCreators.jsx';

function getStateFromStore() {
    return {
        savingsData: SavingsStore.getSavingsData()
    }
}

const SavingsPage = React.createClass({
    componentDidMount () {
        SavingsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount () {
        SavingsStore.removeChangeListener(this._onChange);
    },

    getInitialState () {
        return getStateFromStore();
    },

    _onChange () {
        this.setState(getStateFromStore());
    },

    _addSavings () {
        SavingsActionCreators.setAddSavingModal(true);
    },

    render () {
        let savingsData = this.state.savingsData;
        let savingsListNodes = null;

        if (savingsData) {
            savingsListNodes = _.map(savingsData, (obj, name) => {
                let key = uuid.v4();
                let cx = "col-sm-12 savingsList-content-element";
                let currentSavings = obj.initialSavings;
                let targetPrice = obj.price;
                let percentage = currentSavings/targetPrice * 100;

                console.log(obj.due)

                if (currentSavings === targetPrice) {
                    cx += " savingsList-content-element--done";
                }

                return (
                    <div key={key} className={cx}>
                        <div className="col-sm-2 u-text-center completed">
                            <div className="completed-percentage">{percentage}%</div>
                            <div className="completed-value">{currentSavings}/{targetPrice}</div>
                        </div>
                        <div className="col-sm-5 title">{obj.title}</div>
                        <div className="col-sm-2 monthly">300</div>
                        <div className="col-sm-3 due">{obj.due}</div>
                    </div>
                );
            });
        }

        return (
            <div className="page">
                <div className="btn-add-wrapper">
                    <div className="btn-add" onClick={this._addSavings}><i className="material-icons">add</i></div>
                </div>
                <div className="row">
                	<div className="col-sm-12">
                		<h2>Sinisa Savings</h2>
                		<div className="row savingsList">
                            <div className="col-sm-12 savingsList-header">
                                <div className="col-sm-2 u-text-center savingsList-header-element">Completed</div>
                    			<div className="col-sm-5 savingsList-header-element">Title</div>
                                <div className="col-sm-2 savingsList-header-element">Monthly</div>
                                <div className="col-sm-3 savingsList-header-element">Due</div>
                            </div>
                            {savingsListNodes}
                		</div>
                	</div>
                </div>	
            </div>
        );
    }
});

export default SavingsPage;