'use strict';

/**
 * Bootstrap whole client
 */

import React from 'react/addons';
import Router from 'react-router';

import NotFoundPage from './components/pageComponents/NotFoundPageComponent.jsx';
import OverviewPage from './components/pageComponents/OverviewPageComponent.jsx';
import SavingsPage from './components/pageComponents/SavingsPageComponent.jsx';
import IncomesPage from './components/pageComponents/IncomesPageComponent.jsx';
import SettingsPage from './components/pageComponents/SettingsPageComponent.jsx';
import Navigation from './components/layoutComponents/NavigationComponent.jsx';
import Modal from './components/layoutComponents/ModalComponent.jsx';
import IncomeModal from './components/layoutComponents/IncomeModalComponent.jsx';
import UserStore from './stores/UserStore.jsx';
import ApiUtils from './utils/ApiUtils.jsx';

/**
 * Necessary Router Variables
 */
const { Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect } = Router;
const PureRendermixin = React.addons.PureRenderMixin;

// For React Dev Tools
window.React = React;

function getStateFromStore() {
  return {
    userObject: UserStore.getUser()
  }
}

const App = React.createClass({
  mixins: [PureRendermixin],

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    ApiUtils.retrieveUserObject();
  },

  componentWillUnmount() {
      UserStore.removeChangeListener(this._onChange);
  },

  getInitialState() {
      return getStateFromStore();
  },

  _onChange() {
      this.setState(getStateFromStore());
  },

  render() {
    return (
      <div className="container-fluid">
        {/* The Modal component */}
        <Modal />
        <IncomeModal />

        {/* The MainFrame component is outside the routes, and can be animated seperately */}
        <Navigation prev={this.props.prev} {...this.props} />

        {/* Dynamic part of the pages, affected by routes */}
        <RouteHandler {...this.state} {...this.props} />
      </div>
    );
  }
});

const routes = (
    <Route handler={App} path="/">
        <NotFoundRoute handler={NotFoundPage} />

        {/* Pages */}
        <Route name="overviewPage" path="/overview" handler={OverviewPage} />
        <Route name="savingsPage" path="/savings" handler={SavingsPage} />
        <Route name="incomesPage" path="/incomes" handler={IncomesPage} />
        <Route name="settingsPage" path="/settings" handler={SettingsPage} />

        <Redirect from="/" to="overviewPage" />
    </Route>
);

if (document.getElementById('app')) {
    Router.run(routes, (Handler, state) => {
        const params = state.params;
        const currentPath = state.path;
        const activeRoutes = state.routes.map((el) => {return el.name}).filter((el) => {return el});

        React.render(<Handler currentPath={currentPath} activeRoutes={activeRoutes} params={params} />,
            document.getElementById('app')
        );
    });
}
