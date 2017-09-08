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
            <svg viewBox="-1 -1 9 9" className={"icon "+ iconName} style={{
                fill: fillColor
            }}>
                <use xlinkHref={path.resolve("./dist/open-iconic.svg") + "#" + iconName} className={iconName + "-button"}/>
            </svg>
        );
    }
}

ToolBarButton.defaultProps = {
    iconName: '',
    fillColor: 'lightgrey'
};

ToolBarButton.PropTypes = {
    iconName: PropTypes.string.isRequired
};
