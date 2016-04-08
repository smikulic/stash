'use strict';

import React from 'react/addons';

const AddSaving = React.createClass({
	getInitialState() {
    return {active: false};
	},
	
	componentDidMount () {
    this.setState({active: this.props.active});
	},

	_closeModal () {
		this.setState({active: false});
	},

	render () {
		let AddSavingModal = null;

		if (this.state.active) {
			AddSavingModal = (
				<div>
					<div className="modal-overlay" onClick={this._closeModal}></div>
					<div className="modal">gg</div>
				</div>
			);
		}

		return AddSavingModal;
	}
});

export default AddSaving;
