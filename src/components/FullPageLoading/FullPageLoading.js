import React from 'react';
import { Spinner } from 'reactstrap';
import './styles.scss';

const FullPageLoading = () => (
	<div className='full-page-loading-container'>
		<Spinner color='info' />
	</div>
);

export default FullPageLoading;
