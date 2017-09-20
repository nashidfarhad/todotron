import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

export class DisplayList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            display: 'block'
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.display == 'block') {
            this.setState({display: 'none'});
        } else {
            this.setState({display: 'block'});
        }
    }

    render() {
        if (this.props.list !== null && this.props.list !== undefined) {
            let list = [];
            for(var item in this.props.list) {
                let itemName = item.substr(1);
                list.push(<div key={item} style={{display: this.state.display}}>{itemName + ' (' + this.props.list[item] + ')'}</div>);
            }
            return(
                <div className={this.props.type + '-list'}>
                    <h3 onClick={this.handleClick} className="clickable">{this.props.type + ':'}</h3>
                    {list}
                </div>
            );
        } else {
            return (
                <div className={this.props.type + '-list'}></div>
            );
        }
    }
}

DisplayList.propTypes = {
    list: PropTypes.object,
    type: PropTypes.string.isRequired
}
