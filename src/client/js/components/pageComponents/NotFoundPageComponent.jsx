'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

const NotFound = React.createClass({
    render () {
        return (
            <div className="page">
                <h1>This page could not be found!</h1>
                <p>Back to <Link to="overviewPage">Overview</Link></p>
            </div>
        );
    }
});

export default NotFound;