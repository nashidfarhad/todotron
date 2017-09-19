import React from 'react';
import PropTypes from 'prop-types';
import {Context} from './Context';

export class ContextList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.contextList.length > 0) {
            //alert(this.props.contextList);
            let contextList = this.props.contextList.map((context) => {
                if (context !== null) context = context.substr(1);
                return <div key={context}>{context}</div>;
            });
            //alert('' + contextList);
            return(
                <div className="context-list">
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
