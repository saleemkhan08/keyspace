import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { USER_COLLECTION, redirectComplete } from 'global-state/auth-slice';
import { useDocument } from 'global-state/firestoreHooks';

// reactstrap components
import { Card, Container, Row, Col } from 'reactstrap';

// core components
import { ROUTES } from 'modules/routes';

import FullPageLoading from 'components/full-page-loading';
import { useDispatch } from 'react-redux';
import Background from 'components/background';
import UserDetailTabs from './user-details';

import './profile-page.scss';

const Profile = ({ currentUser }) => {
	const mainRef = useRef();
	const dispatch = useDispatch();
	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		if (mainRef.current) mainRef.current.scrollTop = 0;
		dispatch(redirectComplete());
	}, []);
	const userData = useDocument(`${USER_COLLECTION}/${currentUser?.uid}`);
	console.log('SalUserData : ', { currentUser, userData });
	if (currentUser?.isLoading) {
		return <FullPageLoading />;
	}
	if (!currentUser) {
		return <Redirect to={ROUTES.INDEX} />;
	}
	return (
		<main className='profile-page' ref={mainRef}>
			<Background />
			<section className='section profile-page-section'>
				<Container className='profile-page-section-container'>
					<Card className='card-profile shadow mt--450 p-4'>
						<Row className='justify-content-center'>
							<Col className='order-lg-4 ' lg='4'>
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
									</div>
								</div>
							</Col>
							<Col className='order-lg-8 align-self-lg-center' lg='8'>
								<UserDetailTabs />
							</Col>
						</Row>
					</Card>
				</Container>
			</section>
		</main>
	);
};

export default Profile;
