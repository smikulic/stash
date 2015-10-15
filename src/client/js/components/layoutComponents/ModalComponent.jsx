'use strict';

import React from 'react/addons';
import SavingsStore from '../../stores/SavingsStore.jsx';
import SavingsActionCreators from '../../actions/SavingsActionCreators.jsx';

function getStateFromStore() {
    return {
        addSavingModal: SavingsStore.getSavingModal()
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

	render () {
		let ModalNode = null;

		if (this.state.addSavingModal.active) {
			ModalNode = (
				<div>
					<div className="modal-overlay" onClick={this._closeModal}></div>
					<div className="row modal">
						<div className="col-sm-12 modal-headline">
							<h2>Add new saving</h2>
						</div>
						<div className="col-sm-12 modal-content">
							<input className="input" type="text" placeholder="Title..." />
							<input className="input" type="text" placeholder="Value..." />
							<input className="input" type="text" placeholder="Saved up till now..." />
							<input className="input" type="text" placeholder="Due date..." />
							<button className="btn pull-right">Add</button>
						</div>
					</div>
				</div>
			);
		}

		return ModalNode;
	}
});

export default Modal;