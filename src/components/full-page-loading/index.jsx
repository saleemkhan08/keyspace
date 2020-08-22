import React from 'react';
import { Spinner } from 'reactstrap';
import './full-page-loading.scss';

const FullPageLoading = () => {
	return (
		<div className='full-page-loading-container'>
			<Spinner color='info' />
		</div>
	);
};

export default FullPageLoading;
