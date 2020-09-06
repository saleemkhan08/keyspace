import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'modules/routes';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

// index page sections
import ServiceSection from 'modules/services-section/index.jsx';
import About from 'modules/about/About.js';
import Contact from 'modules/contact/Contact';

const LandingPage = ({ currentUser }) => {
	const mainRef = useRef();
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		if (mainRef.current) mainRef.current.scrollTop = 0;
	}, []);

	const { redirectToProfilePage } = useSelector((state) => {
		return state.auth.user || {};
	});

	if (redirectToProfilePage) {
		return <Redirect to={ROUTES.PROFILE} />;
	}
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
										<h1 className='display-3 text-white'>
											A beautiful Design System{' '}
											<span>completed with examples</span>
										</h1>
										<p className='lead text-white'>
											The design system comes with four pre-built pages to help
											you get started faster. You can change the text and images
											and you're good to go.
										</p>
										<div className='btn-wrapper'>
											<Button
												className='btn-icon mb-3 mb-sm-0'
												color='info'
												href='/'>
												<span className='btn-inner--icon mr-1'>
													<i className='fa fa-code' />
												</span>
												<span className='btn-inner--text'>Sign Up</span>
											</Button>
											<Button
												className='btn-white btn-icon mb-3 mb-sm-0 ml-1'
												color='default'
												href='/'>
												<span className='btn-inner--icon mr-1'>
													<i className='ni ni-cloud-download-95' />
												</span>
												<span className='btn-inner--text'>Download App</span>
											</Button>
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
				<About />
				<Contact />
			</main>
		</>
	);
};

export default LandingPage;
