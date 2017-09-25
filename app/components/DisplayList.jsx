import React from 'react';
import PropTypes from 'prop-types';
import { DisplayListItem } from './DisplayListItem';

export class DisplayList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            display: 'block'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChildClick = this.handleChildClick.bind(this);
    }

    handleClick() {
        if (this.state.display == 'block') {
            this.setState({display: 'none'});
        } else {
            this.setState({display: 'block'});
        }
    }

    handleChildClick(itemName) {
        this.props.onClick(itemName);
    }

    render() {
        if (this.props.list !== null && this.props.list !== undefined) {
            let list = [];
            for(var item in this.props.list) {
                let itemName = item.substr(1);
                list.push(<DisplayListItem key={item} display={this.state.display} 
                                           itemName={itemName} count={this.props.list[item]} 
                                           onClick={this.handleChildClick} />);
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
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func
}
