import React from 'react';
import PropTypes from 'prop-types';
var path = electronRequire('path');

export class ToolBarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {iconName, fillColor} = this.props;
        return (
            <svg viewBox="-1 -1 9 9" className="icon" style={{
                fill: fillColor
            }}>
                <use xlinkHref={path.resolve("./dist/open-iconic.svg") + "#" + iconName} className="icon-account-login"/>
            </svg>
        );
    }
}

ToolBarButton.defaultProps = {
    iconName: '',
    fillColor: 'black'
};

ToolBarButton.PropTypes = {
    iconName: PropTypes.string.isRequired
};
