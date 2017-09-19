import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

export class ContextList extends React.PureComponent {
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
        if (this.props.contextList.length > 0) {
            let contextList = this.props.contextList.map((context) => {
                if (context !== null) context = context.substr(1);
                return <div key={context} style={{display: this.state.display}}>{context}</div>;
            });
            return(
                <div className="context-list">
                    <h3 onClick={this.handleClick} className="clickable">Contexts:</h3>
                    {contextList}
                </div>
            );
        } else {
            return (
                <div className="context-list"></div>
            );
        }
    }
}

ContextList.propTypes = {
    contextList: PropTypes.array
}
