import React from 'react';
import PropTypes from 'prop-types';
import { DisplayList } from './DisplayList';

export class LeftPane extends React.Component {
    constructor(props){
        super(props);
        this.handleTotalTaskClick = this.handleTotalTaskClick.bind(this);
    }
    handleTotalTaskClick(event) {
        this.props.onTotalTaskClick()
    }
    render() {
        return (
            <div className="left-pane">
                <h1 className="todotron">ToDoTron</h1>
                <h2 className="clickable" onClick={this.handleTotalTaskClick}>Total Task: {this.props.totalTaskCount}</h2>
                <DisplayList list={this.props.contexts} onClick={this.props.onContextItemClick} type='context'/>
                <DisplayList list={this.props.projects} onClick={this.props.onProjectItemClick} type='project'/>
            </div>
        );
    }
}

LeftPane.propTypes = {
    totalTaskCount: PropTypes.number,
    contexts: PropTypes.object,
    projects: PropTypes.object,
    onContextItemClick: PropTypes.func,
    onProjectItemClick: PropTypes.func,
    onTotalTaskClick: PropTypes.func
};
