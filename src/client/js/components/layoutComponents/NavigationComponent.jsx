'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

const PureRendermixin = React.addons.PureRenderMixin;
const Navigation = React.createClass({
  mixins: [PureRendermixin],

  render() {
    let overviewElementNode = <div className="navigation-element">Overview</div>;
    let savingsElementNode = <div className="navigation-element">Savings Goals</div>;
    let incomesElementNode = <div className="navigation-element">Incomes</div>;
    let settingsElementNode = <div className="navigation-element">Settings</div>;

    switch(this.props.activeRoutes[0]) {
      case "overviewPage":
        overviewElementNode = <div className="navigation-element active">Overview</div>;
        break;
      case "savingsPage":
        savingsElementNode = <div className="navigation-element active">Savings Goals</div>;
        break;
      case "incomesPage":
        incomesElementNode = <div className="navigation-element active">Incomes</div>;
        break;
      case "settingsPage":
        settingsElementNode = <div className="navigation-element active">Settings</div>;
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
        <Link to="incomesPage">
            {incomesElementNode}
        </Link>
        <Link to="settingsPage">
            {settingsElementNode}
        </Link>
      </div>
    );
  }
});

export default Navigation;
