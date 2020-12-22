import React from 'react';

import { Row, Col } from 'reactstrap';
import { useAuth } from 'globalState/firestoreHooks';
import FullPageLoading from 'components/FullPageLoading';
import ProfileDetails from './ProfileDetails';

import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { logout } from 'globalState/authSlice';
import { USER_COLLECTION } from 'globalState/authSlice';
import { useDocument } from 'globalState/firestoreHooks';
import Image from 'components/Image';

import './styles.scss';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const currentUser = useAuth();
	const { data: userData } = useDocument(
		`${USER_COLLECTION}/${currentUser?.uid}`
	);
	const handleLogout = () => {
		dispatch(logout());
		// redirect to home page
	};
	return (
		<div className='bg-gradient-secondary'>
			<div className='profile-page-container'>
				{currentUser?.isLoading ? (
					<FullPageLoading />
				) : (
					<Row className='profile-page-row-container'>
						<Col className='order-lg-4' lg='3'>
							<div className='profile-image-n-text-container col-lg-3'>
								<Image
									src={userData?.photoUrl}
									fallbackSrc={require('assets/img/icons/common/user-outline.svg')}
									className='rounded-circle profile-image'
								/>
								<div className='user-name-email-container'>
									<h3 className='profile-page-user-name'>{userData?.name}</h3>
									<div className='font-weight-300 profile-page-email'>
										{userData?.email}
									</div>
									<Button
										className='logout-button'
										outline
										size='sm'
										color='default'
										onClick={handleLogout}>
										LOGOUT
									</Button>
								</div>
							</div>
						</Col>
						<Col className='order-lg-7 align-self-lg-center mr-3 ml-3' lg='8'>
							<ProfileDetails />
						</Col>
					</Row>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
