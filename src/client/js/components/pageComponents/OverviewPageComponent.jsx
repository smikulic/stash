'use strict';

import React from 'react/addons';

const OverviewPage = React.createClass({
    render () {
        return (
            <div className="page">
                <div className="row">
                	<div className="col-md-12">
                		<h2>Sinisa Overview</h2>
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