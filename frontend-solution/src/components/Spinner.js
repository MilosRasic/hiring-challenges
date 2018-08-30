import React from 'react';
import PropTypes from 'prop-types';

export default function Spinner(props) {
	const size = `${props.size || 11}rem`;
	return (
		<div className="spinner-wrapper" style={{marginTop: props.offset}}>
			<div className="spinner" style={{width: size, height: size}}></div>
		</div>
	);
}

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
	size: PropTypes.number,
	offset: PropTypes.string,
};
