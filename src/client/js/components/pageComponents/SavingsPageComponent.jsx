'use strict';

import React from 'react/addons';

const SavingsPage = React.createClass({
    render () {
        return (
            <div className="page">
                <div className="row">
                	<div className="col-sm-12">
                		<h2>Sinisa Savings</h2>
                		<div className="row savingsList">
                            <div className="col-sm-12 savingsList-header">
                                <div className="col-sm-2 u-text-center savingsList-header-element">Completed</div>
                    			<div className="col-sm-5 savingsList-header-element">Title</div>
                                <div className="col-sm-2 savingsList-header-element">Monthly</div>
                                <div className="col-sm-3 savingsList-header-element">Due</div>
                            </div>

                            <div className="col-sm-12 savingsList-content-element">
                                <div className="col-sm-2 u-text-center completed">
                                    <div className="completed-percentage">0%</div>
                                    <div className="completed-value">0/1200</div>
                                </div>
                                <div className="col-sm-5 title">New laptop</div>
                                <div className="col-sm-2 monthly">300</div>
                                <div className="col-sm-3 due">4/2016</div>
                            </div>
                            <div className="col-sm-12 savingsList-content-element">
                                <div className="col-sm-2 u-text-center completed">
                                    <div className="completed-percentage">50%</div>
                                    <div className="completed-value">200/400</div>
                                </div>
                                <div className="col-sm-5 title">New glasses</div>
                                <div className="col-sm-2 monthly">200</div>
                                <div className="col-sm-3 due">12/2016</div>
                            </div>
                            <div className="col-sm-12 savingsList-content-element savingsList-content-element--done">
                                <div className="col-sm-2 u-text-center completed">
                                    <div className="completed-percentage">100%</div>
                                    <div className="completed-value">400/400</div>
                                </div>
                                <div className="col-sm-5 title">Marriage documents</div>
                                <div className="col-sm-2 monthly">0</div>
                                <div className="col-sm-3 due">12/2015</div>
                            </div>
                		</div>
                	</div>
                </div>	
            </div>
        );
    }
});

export default SavingsPage;