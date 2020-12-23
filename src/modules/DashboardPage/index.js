import React from 'react';

import { Row, Col } from 'reactstrap';
import { useAuth } from 'globalState/firestoreHooks';
import FullPageLoading from 'components/FullPageLoading';

import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { logout } from 'globalState/authSlice';
import { USER_COLLECTION } from 'globalState/authSlice';
import { useDocument } from 'globalState/firestoreHooks';
import Image from 'components/Image';

import './styles.scss';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const currentUser = useAuth();
	const { data: userData } = useDocument(
		`${USER_COLLECTION}/${currentUser?.uid}`
	);
	return (
		<div className='bg-gradient-secondary'>
			<div className='dashboard-page-container'>
				{currentUser?.isLoading ? (
					<FullPageLoading />
				) : (
					<Row className='dashboard-page-row-container'>
						<Col className='order-lg-7 align-self-lg-center mr-3 ml-3' lg='8'>
							<h1>Dashboard</h1>
						</Col>
					</Row>
				)}
			</div>
		</div>
	);
};

export default DashboardPage;
