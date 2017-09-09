import React from 'react';
import PropTypes from 'prop-types';
var path = require('path');

export class ToolBarButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.iconName);
    }

    render() {
        const {iconName, fillColor, onClick} = this.props;
        return (
            <div className="toolbar-button" onClick={this.handleClick}>
                <svg viewBox="-1 -1 9 9" className={"icon "+ iconName} style={{fill: fillColor}} >
                    <use xlinkHref={path.resolve("./dist/open-iconic.svg") + "#" + iconName} className={iconName + "-button"}/>
                </svg>
            </div>
        );
    }
}

ToolBarButton.defaultProps = {
    iconName: '',
    fillColor: 'lightgrey'
};

ToolBarButton.PropTypes = {
    iconName: PropTypes.string.isRequired,
    fillColor: PropTypes.string,
    onClick: PropTypes.func
};
