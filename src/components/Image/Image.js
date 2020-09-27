import React from 'react';
import { string } from 'prop-types';

const Image = ({ fallbackSrc, className, src, alt, ...rest }) => {
	const addDefaultSrc = (event) => {
		event.target.src = fallbackSrc;
	};
	return (
		<img
			{...rest}
			onError={addDefaultSrc}
			className={className}
			src={src || fallbackSrc}
			alt={alt}
		/>
	);
};

Image.propTypes = {
	className: string,
	src: string.isRequired,
	alt: string,
	fallbackSrc: string.isRequired,
};

Image.defaultProps = {
	className: '',
	alt: '',
};

export default Image;
