'use strict';

import React from 'react/addons';

const SettingsPage = React.createClass({

  render () {
    return (
      <div className="page">
        <div className="row">
          <div className="col-sm-12">
            <h2>{this.props.userObject.username} Settings</h2>
          </div>
        </div>
      </div>
    );
  }
});

export default SettingsPage;
