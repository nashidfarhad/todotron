import React from 'react';
import PropTypes from 'prop-types';

export class Logo extends React.Component {
    render() {
        return (
            <div className="toolbar-logo">
                <svg height="100%" viewBox="0 -2 138 150" className="logo" preserveAspectRatio="xMidYMid">
                    <path d=" M 79.919 60 L 130 39.976 L 109.919 110 L 69.919 140 L 79.919 60 Z " fill={this.props.fillColor}/>
                    <path d=" M 10 39.976 L 59.919 60 L 69.919 140 L 29.919 110 L 10 39.976 Z " fill={this.props.fillColor}/>
                    <path d=" M 70 12 L 130 39.976 L 10 39.976 L 70 12 Z " fill={this.props.fillColor}/>
                    <path d=" M 10 40 L 130 40 L 80 60 L 70 140 L 60 60 L 10 40 Z " fill="rgb(74,134,232)"/>
                </svg>
            </div>
        );
    }
}

Logo.defaultProps = {
    fillColor: 'lightgrey'
};

Logo.propTypes = {
    fillColor: PropTypes.string
};
