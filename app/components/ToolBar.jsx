// ToolBar Component class
import React from 'react';

export class ToolBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="toolbar">
        <p>Toolbar buttons here</p>
      </div>
    );
  }
}
