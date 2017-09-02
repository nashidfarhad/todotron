import React from 'react';
export class IconPlus extends React.Component {
	render () {
		const {color} = this.props;
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
				<path fill={color} d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" />
			</svg>
		);
	}
}

IconPlus.defaultProps = {
	color: 'black'
};

IconPlus.propTypes = {
	color: React.PropTypes.string
};