import React from 'react';
import PropTypes from 'prop-types';

export class IconPlus extends React.Component {
  render() {
    const {color, classes} = this.props;
    return (
      <svg className={classes} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="-1 -1 9 9">
        <path fill={color} d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"/>
      </svg>
    );
  }
}

IconPlus.defaultProps = {
  color: 'black',
  classes: ''
};

IconPlus.propTypes = {
  color: PropTypes.string,
  classes: PropTypes.string
};
