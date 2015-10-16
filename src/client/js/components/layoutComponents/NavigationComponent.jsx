'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

const PureRendermixin = React.addons.PureRenderMixin;
const Navigation = React.createClass({
    mixins: [PureRendermixin],

    render() {
        let overviewElementNode = <div className="navigation-element">Overview</div>;
        let savingsElementNode = <div className="navigation-element">Savings</div>;
        let userElementNode = <div className="navigation-element">{this.props.user}</div>;

        switch(this.props.activeRoutes[0]) {
            case "overviewPage":
                overviewElementNode = <div className="navigation-element active">Overview</div>;
                break;
            case "savingsPage":
                savingsElementNode = <div className="navigation-element active">Savings</div>;
                break;
        }

        return (
            <div className="row navigation">
                <Link to="overviewPage">
                    {overviewElementNode}
                </Link>
                <Link to="savingsPage">
                    {savingsElementNode}
                </Link>
                <Link to="overviewPage">
                    {userElementNode}
                </Link>
            </div>
        );
    }
});

export default Navigation;