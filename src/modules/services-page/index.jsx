import React, { useEffect, useRef, useState } from 'react';

// reactstrap components
import { Row, Col } from 'reactstrap';

import { useDispatch } from 'react-redux';
import Background from 'components/background';

import { SERVICES_COLLECTION } from 'global-state/services-slice';
import { useCollection } from 'global-state/firestoreHooks';
// import ServicesCard from './services-card';

import './services.scss';

const Profile = ({ currentUser }) => {
	const mainRef = useRef();
	const dispatch = useDispatch();
	const allServices = useCollection(SERVICES_COLLECTION);
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		if (mainRef.current) mainRef.current.scrollTop = 0;
	}, []);
	return (
		<main className='' ref={mainRef}>
			<Background />
			<section className='section'>
				<div className='px-4'>
					<div className='mt-5 py-5 border-top text-center'>
						<h1 className='services-heading'> Services </h1>
						<Row className='justify-content-center'>
							{allServices.map((service) => {
								return (
									<Col sm='12' md='6' lg='3'>
										{/* <ServicesCard record={service} /> */}
									</Col>
								);
							})}
						</Row>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Profile;
