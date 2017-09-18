import React from 'react';
import PropTypes from 'prop-types';
import {Context} from './Context';

export class ContextList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let contextList;
        if (this.props.contextList.length > 0) {
            contextList = this.props.contextList.map((context) => {
                <Context contextName={context}/>
            });
        }
        return(
            <div className="context-list">
                {contextList}
            </div>
        );
    }
}

ContextList.propTypes = {
    contextList: PropTypes.array
}
