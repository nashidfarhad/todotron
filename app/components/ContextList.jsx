import React from 'react';
import PropTypes from 'prop-types';

export class ContextList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.contextList.length > 0) {
            let contextList = this.props.contextList.map((context) => {
                if (context !== null) context = context.substr(1);
                return <div key={context}>{context}</div>;
            });
            return(
                <div className="context-list">
                    <h3>Contexts:</h3>
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
