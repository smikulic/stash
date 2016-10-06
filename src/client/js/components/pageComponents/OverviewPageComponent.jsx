'use strict';

import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
import helpers from '../../utils/Helpers.js';
import SavingsStore from '../../stores/SavingsStore.jsx';
import SavingsActionCreators from '../../actions/SavingsActionCreators.jsx';
import IncomesStore from '../../stores/IncomesStore.jsx';
import IncomesActionCreators from '../../actions/IncomesActionCreators.jsx';
import LoadingSpinner from '../modulesComponents/LoadingSpinnerComponent.jsx';

function getStateFromStore() {
  return {
    savingsData: SavingsStore.getSavingsData(),
    incomesData: IncomesStore.getIncomesData()
  }
}

const PureRendermixin = React.addons.PureRenderMixin;
const OverviewPage = React.createClass({
  mixins: [PureRendermixin],

  componentDidMount () {
    SavingsStore.addChangeListener(this._onChange);
    IncomesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount () {
    SavingsStore.removeChangeListener(this._onChange);
    IncomesStore.removeChangeListener(this._onChange);
  },

  componentWillMount() {
    SavingsActionCreators.loadSavingsGoals();
    IncomesActionCreators.loadIncomes();
  },

  getInitialState () {
    return getStateFromStore();
  },

  _onChange () {
    this.setState(getStateFromStore());
  },

  render () {
    let userName = this.props.userObject.username;
    let savingsData = this.state.savingsData;
    let incomesData = this.state.incomesData;
    let incomesThisMonth = 0;
    let headline = null;
    let totalMonthly = null;
    let tempDuration = 0;
    let nextGoal = <div className="overviewStatus-value">N/A</div>;
    let expensesThisMonth = <div className="overviewStatus-value u-negative">0</div>;
    let leftToSpendfield = <div className="overviewStatus-value u-positive">0</div>;
    let currentTime = moment().format("MMM YYYY");

    if (userName) {
      headline = <h2>{userName + ' Overview'}</h2>;
    } else {
      headline = <h4><LoadingSpinner /></h4>;
    }

    // Loop through savings data
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
      });
    }

    // Loop through incomes data
    if (incomesData) {
      _.map(incomesData, (obj, index) => {
        console.log(obj)
        let entryTime = moment(obj.entryTime, "YYYYMM").format("MMM YYYY");

        if (currentTime === entryTime) {
          incomesThisMonth += obj.value;
        }
      });
    }


    return (
      <div className="page">
        <div className="row">
        	<div className="col-md-12">
        		{headline}
        		<div className="row overviewStatus">
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Income for {currentTime}</div>
                  <input className="overviewStatus-value u-positive col-md-12" type="text" value={helpers.formatValues(incomesThisMonth)} />
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Expenses this month</div>
                  {expensesThisMonth}
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
              </div>
            </div>

            {/*<h2>{moment().format("MMM, YYYY")}</h2>
            <div className="row overviewStatus">
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Left to spend</div>
                  <div className="overviewStatus-value">4420 e (33.000 kn)</div>
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">This month</div>
                  <div className="overviewStatus-value">4220 e (31.500 kn)</div>
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Old savings</div>
                  <div className="overviewStatus-value">200 e (1.500 kn)</div>
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Left to spend by budget</div>
                  <div className="overviewStatus-value">1406 e (10.546 kn)</div>
                </div>
              </div>
            </div>

            <h2>Income & Expenses</h2>
            <div className="row overviewStatus">
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Incomes</div>
                  <div className="overviewStatus-value">4220 e (31.650 kn)</div>
                </div>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Compensation</div>
                  <div className="overviewStatus-value">4200 e (31.500 kn)</div>
                </div>
                <ul>
                  <li>2600 e, Solaris, recurring (19.500 kn)</li>
                  <li>1600 e, ISVA, recurring (12.000 kn)</li>
                </ul>
                <div className="col-md-12">
                  <div className="overviewStatus-title">Other</div>
                  <div className="overviewStatus-value">20 e (150 kn)</div>
                </div>
                <ul>
                  <li>20 e, Tablet sale (150 kn)</li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="col-md-12">
                  <div className="overviewStatus-title">Expenses</div>
                </div>
                <div>Household 712e (5.341 kn), budget: 1.333 e (10.000 kn)</div>
                <ul>
                  <li>697 e, Rent, recurring (5.228 kn)</li>
                  <li>15 e, Electricity, recurring (113 kn)</li>
                </ul>
              </div>
        		</div>*/}
        	</div>
        </div>
      </div>
    );
  }
});

export default OverviewPage;
