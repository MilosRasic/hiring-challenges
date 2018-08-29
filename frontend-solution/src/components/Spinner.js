import React from 'react';
import PropTypes from 'prop-types';

export default function Spinner(props) {
	const size = `${props.size || 11}rem`;
	return (
		<div style={{...styles.wrapper, marginTop: props.offset || 0}}>
			<div style={{...styles.spinner, width: size, height: size}}></div>
		</div>
	);
}

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
	size: PropTypes.number,
	offset: PropTypes.string,
};

const styles = {
	wrapper: {
		display: 'block',
		width: '100%',
		textAlign: 'center',
	},
	spinner: {
		borderRadius: '50%',
		transform: 'translateZ(0)',
		animation: 'App-logo-spin 0.8s infinite linear',
		display: 'inline-block',
		width: '11rem',
		height: '11rem',
		borderWidth: '1.1rem',
		borderStyle: 'solid',
		borderColor: 'rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.3)',
	},
};
