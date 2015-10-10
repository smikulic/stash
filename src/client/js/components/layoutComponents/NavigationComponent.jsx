'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

const PureRendermixin = React.addons.PureRenderMixin;
const Navigation = React.createClass({
    mixins: [PureRendermixin],

    render() {
        return (
            <div>
                gg
            </div>
        );
    }
});

export default Navigation;