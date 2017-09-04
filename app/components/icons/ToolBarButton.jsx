import React from 'react';

export class ToolBarButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg viewBox = "-1 -1 9 9" className="icon">
        <use xlinkHref={rootPath + "/node_modules/open-iconic/sprite/open-iconic.svg#" + this.props.iconName} className="icon-account-login"/>
      </svg>
    );
  }
}

ToolBarButton.PropTypes = {
  iconName: React.PropTypes.string.isRequired
};
