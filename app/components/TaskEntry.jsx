import React from 'react';

export class TaskEntry extends React.Component {
    render () {
        return (
            <div className="task-entry" contentEditable={true}></div>
        );
    }
}
