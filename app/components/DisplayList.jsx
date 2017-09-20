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
        if (this.props.list.length > 0) {
            let list = this.props.list.map((item) => {
                if (item !== null) item = item.substr(1);
                return <div key={item} style={{display: this.state.display}}>{item}</div>;
            });
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
    list: PropTypes.array,
    type: PropTypes.string.isRequired
}
