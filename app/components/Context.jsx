import React from 'react';
import PropTypes from 'prop-types';

export class Context extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="left-context">{this.props.contextName}</div>
        );
    }
}

Context.propTypes = {
    contextName: PropTypes.string.isRequired
}
