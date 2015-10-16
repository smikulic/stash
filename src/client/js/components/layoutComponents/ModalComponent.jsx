'use strict';

import React from 'react/addons';
import SavingsStore from '../../stores/SavingsStore.jsx';
import SavingsActionCreators from '../../actions/SavingsActionCreators.jsx';

function getStateFromStore() {
    return {
        addSavingModal: SavingsStore.getSavingModal(),
        titleValidate: true,
        valueValidate: true,
        dueValidate: true
    }
}

const Modal = React.createClass({
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

	_closeModal () {
		SavingsActionCreators.setAddSavingModal(false);
	},

	_submitSaving () {
		let title = this.refs.title.getDOMNode().value;
		let value = this.refs.value.getDOMNode().value;
		let saved = this.refs.saved.getDOMNode().value || 0;
		let due = this.refs.due.getDOMNode().value;

		if (!title) {
			this.setState({titleValidate: false});
		}
		if (!value) {
			this.setState({valueValidate: false});
		}
		if (!due) {
			this.setState({dueValidate: false});
		}

		if (title && value && due) {
			SavingsActionCreators.addSaving(title, value, saved, due);	
			SavingsActionCreators.setAddSavingModal(false);
		}
	},

	render () {
		let ModalNode = null;
		let titleNode = <input ref="title" className="input" type="text" placeholder="Title..." />;
		let valueNode = <input ref="value" className="input" type="number" placeholder="Value..." />;
		let savedNode = <input ref="saved" className="input" type="number" placeholder="Saved up till now..." />;
		let dueNode = <input ref="due" className="input" type="date" placeholder="Due date..." />;

		if (!this.state.titleValidate) {
			titleNode = <input ref="title" className="input u-invalid" type="text" placeholder="Please enter title." />;
		}
		if (!this.state.valueValidate) {
			valueNode = <input ref="value" className="input u-invalid" type="number" placeholder="Please enter numeric value." />;
		}
		if (!this.state.dueValidate) {
			dueNode = <input ref="due" className="input u-invalid" type="date" placeholder="Please enter due date." />;
		}

		if (this.state.addSavingModal.active) {
			ModalNode = (
				<div>
					<div className="modal-overlay" onClick={this._closeModal}></div>
					<div className="row modal">
						<i className="material-icons modal-close" onClick={this._closeModal}>close</i>
						<div className="col-sm-12 modal-headline">
							<h2>Add new saving goal</h2>
						</div>
						<div className="col-sm-12 modal-content">
							{titleNode}
							{valueNode}
							<span className="u-currency">EUR</span>
							{savedNode}
							{dueNode}
							<button className="btn pull-right" onClick={this._submitSaving}>Add</button>
						</div>
					</div>
				</div>
			);
		}

		return ModalNode;
	}
});

export default Modal;