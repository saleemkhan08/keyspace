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
import './profile-page.scss';

const Profile = ({ currentUser }) => {
	const mainRef = useRef();
	const dispatch = useDispatch();
	const [imgLoaded, setImgLoaded] = useState(false);
	const services = [
		'Cook',
		'Security',
		'Maid',
		'Water Can',
		'Carpenter',
		'Plumbing',
	];
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		if (mainRef.current) mainRef.current.scrollTop = 0;
		dispatch(redirectComplete());
	}, []);

	const userData = useDocument(`${USER_COLLECTION}/${currentUser?.uid}`);
	console.log('SalUserData : ', { currentUser });
	if (currentUser?.isLoading) {
		return <FullPageLoading />;
	}
	if (!currentUser) {
		return <Redirect to={ROUTES.INDEX} />;
	}
	console.log('SalUserData : ', { userData });
	return (
		<>
			<main className='profile-page' ref={mainRef}>
				<Background />
				<section className='section'>
					<Container>
						<Card className='card-profile shadow mt--400'>
							<div className='px-4'>
								<Row className='justify-content-center'>
									<div className='card-profile-image'>
										<a href='#pablo' onClick={(e) => e.preventDefault()}>
											<img
												alt='...'
												className='rounded-circle'
												src={userData.photoUrl}
												onLoad={() => setImgLoaded(true)}
											/>
											{!imgLoaded && (
												<img
													alt='...'
													className='rounded-circle user-photo-placeholder'
													src={require('assets/img/icons/common/user-outline.svg')}
												/>
											)}
										</a>
									</div>
								</Row>
								<div className='text-center mt-7'>
									<h3>{userData.name}</h3>
									<div className='h6 font-weight-300'>{userData.email}</div>
								</div>
								<div className='mt-5 py-5 border-top text-center'>
									<Row className='justify-content-center'>
										{services.map((service) => {
											return (
												<Col sm='12' md='6' lg='3'>
													<Card className='shadow m-3'>{service}</Card>
												</Col>
											);
										})}
									</Row>
								</div>
							</div>
						</Card>
					</Container>
				</section>
			</main>
		</>
	);
};

export default Profile;
