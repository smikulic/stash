'use strict';

import React from 'react/addons';
import LoadingSpinner from '../modulesComponents/LoadingSpinnerComponent.jsx';

const PureRendermixin = React.addons.PureRenderMixin;
const OverviewPage = React.createClass({
  mixins: [PureRendermixin],

  render () {
    let userName = this.props.userObject.username;
    let headline = null;

    if (userName) {
      headline = <h2>{userName + ' Overview'}</h2>;
    } else {
      headline = <h4><LoadingSpinner /></h4>;
    }

    return (
      <div className="page">
        <div className="row">
        	<div className="col-md-12">
        		{headline}
        		<div className="row overviewStatus">
        			<div className="col-md-12">
        				<div className="overviewStatus-title">Income/month</div>
        				<input className="overviewStatus-value u-positive col-md-12" type="text" />
        			</div>
        			<div className="col-md-12">
        				<div className="overviewStatus-title">Total savings</div>
        				<div className="overviewStatus-value u-negative">xxxx till xx.xx.xxx</div>
        			</div>
        			<div className="col-md-12">
        				<div className="overviewStatus-title">Total income</div>
        				<div className="overviewStatus-value u-positive">xxxx till xx.xx.xxx</div>
        			</div>
        		</div>
        	</div>
        </div>	
      </div>
    );
  }
});

export default OverviewPage;
