'use strict';

import React from 'react/addons';
import _ from 'lodash';
import uuid from 'uuid';
import moment from 'moment';
import IncomesStore from '../../stores/IncomesStore.jsx';
import IncomesActionCreators from '../../actions/IncomesActionCreators.jsx';

function getStateFromStore() {
  return {
    incomesData: IncomesStore.getIncomesData()
  }
}

const IncomesPage = React.createClass({
  componentDidMount () {
    IncomesStore.addChangeListener(this._onChange);
  },

  componentWillUnmount () {
    IncomesStore.removeChangeListener(this._onChange);
  },

  componentWillMount() {
    IncomesActionCreators.loadIncomes();  
  },

  getInitialState () {
    return getStateFromStore();
  },

  _onChange () {
    this.setState(getStateFromStore());
  },

  _addIncome () {
    IncomesActionCreators.setAddIncomeModal(true);
  },

  _delete (id) {
    IncomesActionCreators.deleteIncome(id);
  },

  render () {
    let incomesData = this.state.incomesData;
    let incomesListNodes = null;

    if (incomesData) {
      incomesListNodes = _.map(incomesData, (obj, index) => {
        let key = uuid.v4();
        let cx = "col-sm-12 incomesList-content-element";
        let entryTime = moment(obj.entryTime, "YYYYDDMM").format("DD MMM YYYY");
        let valueToString = obj.value.toString();
        let valueToStringLength = obj.value.toString().length;
        let value = valueToString.slice(0, valueToStringLength - 2) + "." + valueToString.slice(valueToStringLength - 2);

        return (
          <div key={key} className={cx} id={index}>
            <div className="col-xs-5 col-sm-5 title">{obj.title}</div>
            <div className="col-xs-3 col-sm-3 category">{obj.category}</div>
            <div className="col-xs-2 col-sm-2 value">{value} {obj.currency}</div>
            <div className="col-xs-2 col-sm-2 entryTime">{entryTime}</div>
            <i className="material-icons deleteIncome" onClick={this._delete.bind(this, obj._id)}>delete</i>
          </div>
        );
      });
    }

    return (
      <div className="page">
        <div className="btn-add-wrapper">
          <div className="btn-add" onClick={this._addIncome}><i className="material-icons">add</i></div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h2>{this.props.userObject.username} Incomes</h2>
            <div className="row incomesList">
              <div className="col-sm-12 incomesList-header">
                <div className="col-xs-5 col-sm-5 incomesList-header-element">Title</div>
                <div className="col-xs-3 col-sm-3 incomesList-header-element">Category</div>
                <div className="col-xs-2 col-sm-2 incomesList-header-element">Value</div>
                <div className="col-xs-2 col-sm-2 incomesList-header-element">Entry time</div>
              </div>
              {incomesListNodes}
            </div>
          </div>
        </div>  
      </div>
    );
  }
});

export default IncomesPage;
