import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ROUTES } from 'modules/routes';
import {
	appartment,
	corporateOffice,
	individualHouse,
	society,
} from 'assets/img/icons';
import './styles.scss';

const About = ({ currentPosition }) => {
	const positionRef = useRef(null);
	useEffect(() => {
		if (currentPosition === ROUTES.ABOUT) {
			positionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [currentPosition]);
	return (
		<section ref={positionRef} className='section bg-gradient-secondary'>
			<Container className='pt-lg pb-300'>
				<Row className='text-center justify-content-center'>
					<Col lg='10'>
						<h2 className='display-3 text-default'>About Us</h2>
						<p className='lead text-default'>
							Keyspace provides all the necessary service required to live your
							day to day life comfortably. Security and privacy is our main
							objective and every contractor and service provider go through an
							extensive background check when they are enrolled.
						</p>
					</Col>
				</Row>
				<hr />
				<Row className='row-grid mt-5'>
					<Col lg='3'>
						<div className='titleContainer'>
							<h5 className='text-default mt-3'>Independent Houses</h5>
							<img src={individualHouse} alt='' />
						</div>
						<p className='text-default mt-3'>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</p>
					</Col>
					<Col lg='3'>
						<div className='titleContainer'>
							<h5 className='text-default mt-3'>Appartments</h5>
							<img src={appartment} alt='' />
						</div>
						<p className='text-default mt-3'>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</p>
					</Col>
					<Col lg='3'>
						<div className='titleContainer'>
							<h5 className='text-default mt-3'>Societies</h5>
							<img src={society} alt='' />
						</div>
						<p className='text-default mt-3'>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</p>
					</Col>
					<Col lg='3'>
						<div className='titleContainer'>
							<h5 className='text-default mt-3'>Corporate Offices</h5>
							<img src={corporateOffice} alt='' />
						</div>
						<p className='text-default mt-3'>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</p>
					</Col>
				</Row>
			</Container>
			{/* SVG separator */}
			<div className='separator separator-bottom separator-skew zindex-100'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					preserveAspectRatio='none'
					version='1.1'
					viewBox='0 0 2560 100'
					x='0'
					y='0'>
					<polygon className='fill-white' points='2560 0 2560 100 0 100' />
				</svg>
			</div>
		</section>
	);
};

export default About;
