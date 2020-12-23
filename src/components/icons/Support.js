import * as React from 'react';

function SvgSupport(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 373.232 373.232'
			width='1em'
			height='1em'
			{...props}>
			<path
				fill='currentColor'
				d='M187.466 0h-.6c-101.2 0-183.5 82.3-183.5 183.5 0 41.3 14.1 81.4 39.9 113.7l-26.7 62.1c-2.2 5.1.2 11 5.2 13.1 1.8.8 3.8 1 5.7.7l97.9-17.2c19.6 7.1 40.2 10.7 61 10.6 101.2 0 183.5-82.3 183.5-183.5.2-100.9-81.5-182.9-182.4-183zm-62.8 146.6h54c5.5 0 10 4.5 10 10s-4.5 10-10 10h-54c-5.5 0-10-4.5-10-10s4.5-10 10-10zm124 70h-124c-5.5 0-10-4.5-10-10s4.5-10 10-10h124c5.5 0 10 4.5 10 10s-4.5 10-10 10z'
			/>
		</svg>
	);
}

export default SvgSupport;
