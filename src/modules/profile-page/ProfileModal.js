import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { USER_COLLECTION } from 'global-state/auth-slice';
import { useDocument } from 'global-state/firestoreHooks';

import { Row, Col, Modal, Button } from 'reactstrap';

import { logout } from 'global-state/auth-slice';
import FullPageLoading from 'components/full-page-loading';
import UserDetailTabs from './UserDetailTabs';

import './profile-modal.scss';

const ProfileModal = ({ currentUser, isOpen, toggleModal }) => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
		toggleModal(false);
	};

	// TODO - move image error handling to a separate component
	const [imgLoaded, setImgLoaded] = useState(false);
	const userData = useDocument(`${USER_COLLECTION}/${currentUser?.uid}`);
	return (
		<Modal
			className='modal-dialog-centered profileModal'
			contentClassName='profile-modal-container'
			size='lg'
			isOpen={isOpen}
			toggle={toggleModal}>
			<div className='modal-body'>
				{currentUser?.isLoading ? (
					<FullPageLoading />
				) : (
					<div className='justify-content-center'>
						<Row>
							<Col className='order-lg-4 ' lg='3'>
								<div className='profile-image-n-text-container'>
									<img
										src={userData?.photoUrl}
										alt='...'
										onLoad={() => setImgLoaded(true)}
										style={{ display: 'none' }}
									/>
									{imgLoaded ? (
										<img
											alt='...'
											className={`rounded-circle profile-image`}
											src={userData?.photoUrl}
										/>
									) : (
										<img
											alt='...'
											className={`rounded-circle profile-image user-photo-placeholder`}
											src={require('assets/img/icons/common/user-outline.svg')}
										/>
									)}
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
							<Col className='order-lg-8 align-self-lg-center' lg='9'>
								<UserDetailTabs />
							</Col>
						</Row>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default ProfileModal;
