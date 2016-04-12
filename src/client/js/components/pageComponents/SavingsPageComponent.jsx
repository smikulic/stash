'use strict';

import React from 'react/addons';
import _ from 'lodash';
import uuid from 'uuid';
import moment from 'moment';
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

  componentWillMount() {
    SavingsActionCreators.loadSavingsGoals();  
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

  _deleteSaving (e) {
    e.preventDefault();
    console.log(e.target.parentNode.id)
    SavingsActionCreators.deleteSaving(e.target.parentNode.id);
  },

  render () {
    let savingsData = this.state.savingsData;
    let savingsListNodes = null;

    if (savingsData) {
      savingsListNodes = _.map(savingsData, (obj, index) => {
        let key = uuid.v4();
        let cx = "col-sm-12 savingsList-content-element";
        let markNode = null;
        let currentSavings = obj.saved;
        let targetPrice = obj.value;
        let percentage = currentSavings/targetPrice * 100;
        let dueDate = obj.due;
        let duration = moment.duration(moment(dueDate).diff(moment())).humanize();
        let durationMonthly = moment.duration(moment(dueDate).diff(moment())).asMonths();
        let monthly = (targetPrice - currentSavings) / Math.round(durationMonthly);

        if (currentSavings === targetPrice) {
          cx += " savingsList-content-element--done";
          markNode = <i className="material-icons">check</i>;
        }

        return (
          <div key={key} className={cx} id={index}>
            <div className="col-xs-2 col-sm-2 u-text-center completed">
              {markNode}
              <div className="completed-percentage">{percentage}%</div>
              <div className="completed-value">{currentSavings}/{targetPrice}</div>
            </div>
            <div className="col-xs-5 col-sm-5 title">{obj.title}</div>
            <div className="col-xs-2 col-sm-2 monthly">{Math.round(monthly)}</div>
            <div className="col-xs-3 col-sm-3 due">
              <div className="due-date">{moment(dueDate).format('ll')}</div>
              <div className="due-in">in {duration}</div>
            </div>
            <i className="material-icons deleteSaving" onClick={this._deleteSaving}>delete</i>
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
        		<h2>{this.props.userObject.username} Goals</h2>
        		<div className="row savingsList">
              <div className="col-sm-12 savingsList-header">
                <div className="col-xs-2 col-sm-2 u-text-center savingsList-header-element">Completed</div>
      			    <div className="col-xs-5 col-sm-5 savingsList-header-element">Title</div>
                <div className="col-xs-2 col-sm-2 savingsList-header-element">Monthly</div>
                <div className="col-xs-3 col-sm-3 savingsList-header-element">Due</div>
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
