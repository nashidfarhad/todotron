// ToolBar Component class
import React from 'react';
import {ToolBarButton} from './icons/ToolBarButton';
import {IconPlus} from './icons/IconPlus';

export class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="toolbar">
                <ToolBarButton iconName="file" fillColor="lightgrey"/>
                <ToolBarButton iconName="folder" fillColor="lightgrey"/>
                <ToolBarButton iconName="hard-drive" fillColor="lightgrey"/>
                <ToolBarButton iconName="action-redo" fillColor="lightgrey"/>
                <ToolBarButton iconName="action-undo" fillColor="lightgrey"/>
                <ToolBarButton iconName="circle-check" fillColor="lightgrey"/>
                <ToolBarButton iconName="arrow-circle-top" fillColor="lightgrey"/>
                <ToolBarButton iconName="arrow-circle-bottom" fillColor="lightgrey"/>
                <ToolBarButton iconName="trash" fillColor="lightgrey"/>
            </div>
        );
    }
}
