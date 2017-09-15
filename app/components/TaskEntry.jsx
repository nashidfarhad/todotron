import React from 'react';

export class TaskEntry extends React.Component {
    constructor (props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleKeyDown (event) {
        if(event.key === 'Enter') {
            this.props.addTask(event.target.innerHTML);
            event.target.innerHTML = "";
            event.preventDefault();
        }
    }
    render () {
        return (
            <div className="task-entry" contentEditable={true}
                 onKeyDown={this.handleKeyDown} >
            </div>
        );
    }
}
