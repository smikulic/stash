'use strict';

import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import SavingsStore from '../../stores/SavingsStore.jsx';
import SavingsActionCreators from '../../actions/SavingsActionCreators.jsx';
import LoadingSpinner from '../modulesComponents/LoadingSpinnerComponent.jsx';

function getStateFromStore() {
  return {
    savingsData: SavingsStore.getSavingsData()
  }
}

const PureRendermixin = React.addons.PureRenderMixin;
const OverviewPage = React.createClass({
  mixins: [PureRendermixin],

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

  _handleIncomeChange (event) {
    this.setState({incomeValue: event.target.value});
    SavingsActionCreators.addIncomeValue({
      incomeValue: event.target.value
    });
  },

  render () {
    let userName = this.props.userObject.username;
    let savingsData = this.state.savingsData;
    let userIncome = this.props.userObject.income;
    let headline = null;
    let totalMonthly = null;
    let totalLeftToSpend = null;
    let tempDuration = 0;
    let nextGoal = <div className="overviewStatus-value">N/A</div>;
    let expensesThisMonth = <div className="overviewStatus-value u-negative">0</div>;
    let leftToSpendfield = <div className="overviewStatus-value u-positive">0</div>;

    if (userName) {
      headline = <h2>{userName + ' Overview'}</h2>;
    } else {
      headline = <h4><LoadingSpinner /></h4>;
    }

    if (this.state.incomeValue > 0) {
      userIncome = this.state.incomeValue;
    }

    if (savingsData) {
      _.map(savingsData, (obj, index) => {
        let currentSavings = obj.saved;
        let targetPrice = obj.value;
        let percentage = currentSavings/targetPrice * 100;
        let dueDate = obj.due;
        let durationMonthly = Math.round(moment.duration(moment(dueDate).diff(moment())).asMonths());
        let monthly = (targetPrice - currentSavings) / durationMonthly;

        if (!isNaN(monthly)) {
          totalMonthly += Math.round(monthly);  
        }

        if ((tempDuration == 0) || ((tempDuration > durationMonthly) && (durationMonthly > 0))) {          
          tempDuration = durationMonthly;
          nextGoal = (
            <div className="overviewStatus-value">
              {obj.title} in {moment.duration(moment(dueDate).diff(moment())).humanize()}
            </div>
          );
        }

        {/*<div className="completed-percentage">{percentage}%</div>
        <div className="completed-value">{currentSavings}/{targetPrice}</div>
        <div className="due-date">{moment(dueDate).format('ll')}</div>*/}
      });

      totalLeftToSpend = userIncome - totalMonthly;

      if (totalLeftToSpend > 0) {
        leftToSpendfield = <div className="overviewStatus-value u-positive">{totalLeftToSpend}</div>;
      } else {
        leftToSpendfield = <div className="overviewStatus-value u-negative">{totalLeftToSpend}</div>;
      }

      expensesThisMonth = <div className="overviewStatus-value u-negative">{totalMonthly}</div>;
    }


    return (
      <div className="page">
        <div className="row">
        	<div className="col-md-12">
        		{headline}
        		<div className="row overviewStatus">
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Income/month</div>
                  <input className="overviewStatus-value u-positive col-md-12" type="text" value={userIncome} onChange={this._handleIncomeChange} />
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Expenses this month</div>
                  {expensesThisMonth}
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Left to spend</div>
                  {leftToSpendfield}
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Savings Goals</div>
                  <div className="overviewStatus-value">{savingsData.length}</div>
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Next Goal</div>
                  {nextGoal}
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Longest Goal</div>
                  <div className="overviewStatus-value">N/A</div>
                </div>
              </div>
        		</div>
        	</div>
        </div>	
      </div>
    );
  }
});

export default OverviewPage;
