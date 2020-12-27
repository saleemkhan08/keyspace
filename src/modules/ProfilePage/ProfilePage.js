import React from 'react';

import { Row, Col } from 'reactstrap';
import { useAuth, useFileStorage } from 'globalState/firestoreHooks';
import FullPageLoading from 'components/FullPageLoading';
import ProfileDetails from './ProfileDetails';

import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { logout } from 'globalState/authSlice';
import { USER_COLLECTION } from 'globalState/authSlice';
import { useDocument } from 'globalState/firestoreHooks';
import fallbackImage from 'assets/img/icons/common/user-outline.svg';

import './styles.scss';
import UploadPhoto from 'modules/Components/UploadPhoto';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const currentUser = useAuth();
	const userDataPath = `${USER_COLLECTION}/${currentUser?.uid}`;
	const { data: userData, updateDoc } = useDocument(userDataPath);
	const handleLogout = () => {
		dispatch(logout());
		// redirect to home page
	};
	const { uploading, fileInputChangeHandler, preview } = useFileStorage({
		docPath: userDataPath,
		fileName: 'photoUrl',
		updateDoc,
		recordData: userData,
	});

	return (
		<div className='bg-gradient-secondary'>
			<div className='profile-page-container'>
				{currentUser?.isLoading ? (
					<FullPageLoading />
				) : (
					<Row className='profile-page-row-container'>
						<Col className='order-lg-4' lg='3'>
							<div className='profile-image-n-text-container col-lg-3'>
								<div
									className={`profile-image-container ${
										uploading && 'disabled'
									}`}
									style={{
										backgroundImage: `url(${
											preview || userData?.photoUrl || fallbackImage
										})`,
									}}>
									<div className='profile-image-action-container'>
										<UploadPhoto
											uploading={uploading}
											fileInputChangeHandler={fileInputChangeHandler}
											className='profile-image-action'
										/>
									</div>
								</div>
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
						<Col className='order-lg-7 mr-3 ml-3' lg='8'>
							<ProfileDetails />
						</Col>
					</Row>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
