import React from 'react';
import PropTypes from 'prop-types';

export class DisplayListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onClick(this.props.itemName);
    }
    render() {
        return (
            <div style={{display: this.props.display}} onClick={this.handleClick}>{this.props.itemName + ' (' + this.props.count + ')'}</div>
        );
    }
}

DisplayListItem.propTypes = {
    display: PropTypes.string,
    itemName: PropTypes.string,
    count: PropTypes.number
};
