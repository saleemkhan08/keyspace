import * as React from 'react';

function SvgRepeat(props) {
	return (
		<svg viewBox='0 0 512 512' width='1em' height='1em' {...props}>
			<path
				fill='currentColor'
				d='M465.99 212.009h-59.997c-8.291 0-14.999 6.709-14.999 14.999v134.993h-209.99v-44.998c0-12.371-14.16-19.363-23.993-11.996L37.017 395.002c-8.006 5.989-7.994 18.013 0 23.993l119.994 89.995c9.69 7.322 23.993.501 23.993-11.996v-44.998h254.987c24.813 0 44.998-20.185 44.998-44.998v-179.99c0-8.291-6.709-14.999-14.999-14.999zM474.983 93.022L354.989 3.026c-9.79-7.407-23.993-.379-23.993 11.996V60.02H76.009c-24.813 0-44.998 20.185-44.998 44.998v179.991c0 8.291 6.709 14.799 14.999 14.799h59.997c8.291 0 14.999-6.509 14.999-14.799V149.816h209.989v45.198c0 12.44 14.292 19.374 23.993 11.996l119.994-89.995c8.007-5.989 7.995-18.014.001-23.993z'
			/>
		</svg>
	);
}

export default SvgRepeat;