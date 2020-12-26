import React from 'react';
import { Button, Card, CardBody, Col } from 'reactstrap';

const ServicesCard = ({ service }) => (
	<Col lg='4'>
		<Card className='card-lift--hover shadow border-0 mb-4'>
			<CardBody className='py-5'>
				<img src={service.photoUrl} alt='' className='service-img mb-2' />
				<h6 className='text-primary text-uppercase'>{service.name}</h6>
				<p className='description mt-3'>
					{service.description ||
						`Argon is a great free UI package based on Bootstrap 4 that includes
						the most important components and features.`}
				</p>
				<Button
					className='mt-4'
					color='primary'
					href='#keyspace'
					onClick={(e) => e.preventDefault()}>
					Subscribe
				</Button>
			</CardBody>
		</Card>
	</Col>
);
export default ServicesCard;
