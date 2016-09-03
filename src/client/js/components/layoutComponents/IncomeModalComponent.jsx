'use strict';

import React from 'react/addons';
import IncomesStore from '../../stores/IncomesStore.jsx';
import IncomesActionCreators from '../../actions/IncomesActionCreators.jsx';

function getStateFromStore() {
  return {
    addIncomeModal: IncomesStore.getIncomeModal(),
    titleValidate: true,
    categoryValidate: true,
    valueValidate: true,
    currencyValidate: true,
    entryTimeValidate: true,
  }
}

const IncomeModal = React.createClass({
  componentDidMount () {
      IncomesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount () {
      IncomesStore.removeChangeListener(this._onChange);
    },

    getInitialState () {
      return getStateFromStore();
    },

    _onChange () {
      this.setState(getStateFromStore());
    },

  _closeModal () {
    IncomesActionCreators.setAddIncomeModal(false);
  },

  _submit () {
    let title = this.refs.title.getDOMNode().value;
    let category = this.refs.category.getDOMNode().value;
    let value = this.refs.value.getDOMNode().value;
    let currency = this.refs.currency.getDOMNode().value;
    let entryTime = this.refs.entryTime.getDOMNode().value;

    if (!title) {
      this.setState({titleValidate: false});
    }
    if (!category) {
      this.setState({categoryValidate: false});
    }
    if (!value) {
      this.setState({valueValidate: false});
    }
    if (!currency) {
      this.setState({currencyValidate: false});
    }
    if (!entryTime) {
      this.setState({entryTimeValidate: false});
    }

    if (title && category && value && currency && entryTime) {
      IncomesActionCreators.addIncome({
        title: title,
        category: category,
        value: value,
        currency: currency,
        entryTime: entryTime
      });
      IncomesActionCreators.setAddIncomeModal(false);
    }
  },

  render () {
    let ModalNode = null;
    let titleNode = <input ref="title" className="input" type="text" placeholder="Title..." />;
    let categoryNode = <input ref="category" className="input" type="text" placeholder="Category..." />;
    let valueNode = <input ref="value" className="input" type="number" placeholder="Value..." />;
    let currencyNode = <input ref="currency" className="input" type="text" placeholder="Currency..." />;
    let entryTimeNode = <input ref="entryTime" className="input" type="date" placeholder="Entry date..." />;

    if (!this.state.titleValidate) {
      titleNode = <input ref="title" className="input u-invalid" type="text" placeholder="Please enter title." />;
    }
    if (!this.state.categoryValidate) {
      categoryNode = <input ref="category" className="input u-invalid" type="text" placeholder="Please enter category." />;
    }
    if (!this.state.valueValidate) {
      valueNode = <input ref="value" className="input u-invalid" type="number" placeholder="Please enter numeric value." />;
    }
    if (!this.state.currencyValidate) {
      currencyNode = <input ref="currency" className="input u-invalid" type="text" placeholder="Please enter currency." />;
    }
    if (!this.state.entryTimeValidate) {
      entryTimeNode = <input ref="entryTime" className="input u-invalid" type="date" placeholder="Please enter entry date." />;
    }
    

    if (this.state.addIncomeModal.active) {
      ModalNode = (
        <div>
          <div className="modal-overlay" onClick={this._closeModal}></div>
          <div className="row modal">
            <i className="material-icons modal-close" onClick={this._closeModal}>close</i>
            <div className="col-sm-12 modal-headline">
              <h2>Add new income</h2>
            </div>
            <div className="col-sm-12 modal-content">
              {titleNode}
              {categoryNode}
              {valueNode}
              {currencyNode}
              {entryTimeNode}
              <button className="btn pull-right" onClick={this._submit}>Add</button>
            </div>
          </div>
        </div>
      );
    }

    return ModalNode;
  }
});

export default IncomeModal;
