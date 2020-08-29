import React from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';

import { SERVICES_COLLECTION } from 'global-state/services-slice';
import { useCollection } from 'global-state/firestoreHooks';
import ServicesCard from './services-card';

import './services-grid.scss';

const ServicesGrid = () => {
	const allServices = useCollection(SERVICES_COLLECTION);
	return (
		<div className='mt-5 py-5 border-top text-center'>
			<h1 className='services-heading'> Services </h1>
			<Row className='justify-content-center'>
				{allServices.map((service) => {
					return (
						<Col sm='12' md='6' lg='3'>
							<ServicesCard record={service} />
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default ServicesGrid;
