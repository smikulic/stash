'use strict';

/**
 * Bootstrap whole client
 */

import React from 'react/addons';
import Router from 'react-router';

import NotFoundPage from './components/pageComponents/NotFoundPageComponent.jsx';
import OverviewPage from './components/pageComponents/OverviewPageComponent.jsx';
import SavingsPage from './components/pageComponents/SavingsPageComponent.jsx';
import Navigation from './components/layoutComponents/NavigationComponent.jsx';
import Modal from './components/layoutComponents/ModalComponent.jsx';


/**
 * Necessary Router Variables
 */
const { Route, RouteHandler, DefaultRoute, NotFoundRoute, Redirect } = Router;
const PureRendermixin = React.addons.PureRenderMixin;

// For React Dev Tools
window.React = React;

function getStateFromStore() {
    return {
        userObject: 'test user',//UserStore.getUser(),
        //socketIsLive: UserStore.getSocketIsLive()
    }
}

const App = React.createClass({
    mixins: [PureRendermixin],

    componentDidMount() {
        /*UserStore.addChangeListener(this._onChange);
        ApiUtils.retrieveUserObject();

        if (!this.state.socketIsLive) {
            WebSocketUtils.initialize();
        }*/
    },

    componentWillUnmount() {
        //UserStore.removeChangeListener(this._onChange);
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

                {/* The MainFrame component is outside the routes, and can be animated seperately */}
                <Navigation user={this.state.userObject} prev={this.props.prev} {...this.props} />

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