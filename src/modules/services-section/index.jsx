import React, { useState } from 'react';

// reactstrap components
import { Button, Container, Row, Col, Collapse } from 'reactstrap';

import { SERVICES_COLLECTION } from 'global-state/services-slice';
import { useCollection } from 'global-state/firestoreHooks';

import ServicesCard from './ServicesCard';
import './services.scss';

const ServiceSection = () => {
	const services = useCollection({
		collectionPath: SERVICES_COLLECTION,
		order: 'priority',
	});
	const [showAll, setLoadAll] = useState(false);
	return (
		<section className='section section-lg pt-lg-0 mt--200 pb-4'>
			<Container>
				<Row className='justify-content-center'>
					<Col lg='12'>
						<Row className='row-grid justify-content-center'>
							{services.map((service, index) => {
								if (index < 3) {
									return <ServicesCard service={service} />;
								} else return null;
							})}

							<Collapse isOpen={showAll}>
								<Row className='row-grid justify-content-center'>
									{services.map((service, index) => {
										if (index > 2) {
											return <ServicesCard service={service} />;
										} else return null;
									})}
								</Row>
							</Collapse>
							<Button color='link' onClick={() => setLoadAll(!showAll)}>
								{showAll ? 'Show less' : 'Show All'}
							</Button>
						</Row>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default ServiceSection;
