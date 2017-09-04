// ToolBar Component class
import React from 'react';
import {ToolBarButton} from './icons/ToolBarButton';

export class ToolBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="toolbar">
        <ToolBarButton iconName = "book"/>
        <ToolBarButton iconName = "caret-left"/>
        <ToolBarButton iconName = "caret-right"/>
      </div>
    );
  }
}
