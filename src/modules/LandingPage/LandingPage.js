import React, { useEffect, useRef } from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// index page sections
import ServiceSection from './ServicesSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import {
	showNotification,
	NotificationTypeEnum,
} from 'globalState/notificationSlice';
import { playStoreBadge } from 'assets/img/icons';
import './styles.scss';
import { useDispatch } from 'react-redux';

const LandingPage = ({ currentUser, currentPosition }) => {
	const mainRef = useRef();
	const dispatch = useDispatch();
	const handleDownload = () => {
		dispatch(
			showNotification({
				message: 'Coming Soon...',
				type: NotificationTypeEnum.INFO,
			})
		);
	};
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		if (mainRef.current) mainRef.current.scrollTop = 0;
	}, []);
	return (
		<>
			<main ref={mainRef}>
				<div className='position-relative'>
					<section className='section section-lg section-shaped pb-250'>
						<div className='shape shape-style-1 shape-default'>
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
						<Container className='py-lg-md d-flex'>
							<div className='col px-0'>
								<Row>
									<Col lg='6'>
										<h1 className='display-3 text-white mt-6'>
											Make your life simpler... <br />
											Get started with us today!
										</h1>
										<div className='btn-wrapper mt-3'>
											<img
												src={playStoreBadge}
												alt='Get it on Playstore'
												className='playStoreBadgeBtn shadow'
												onClick={handleDownload}
											/>
										</div>
									</Col>
								</Row>
							</div>
						</Container>
						<div className='separator separator-bottom separator-skew'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								preserveAspectRatio='none'
								version='1.1'
								viewBox='0 0 2560 100'
								x='0'
								y='0'>
								<polygon
									className='fill-white'
									points='2560 0 2560 100 0 100'
								/>
							</svg>
						</div>
					</section>
				</div>
				<ServiceSection />
				<AboutSection currentPosition={currentPosition} />
				<ContactSection currentPosition={currentPosition} />
			</main>
		</>
	);
};

export default LandingPage;
