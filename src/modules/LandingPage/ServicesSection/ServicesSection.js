import React, { useState } from 'react';

// reactstrap components
import { Button, Container, Row, Col, Collapse } from 'reactstrap';

import { SERVICES_COLLECTION } from 'globalState/servicesSlice';
import { useCollection } from 'globalState/firestoreHooks';
import ServicesCard from 'modules/Components/ServicesCard';

import './styles.scss';

const ServiceSection = () => {
	const { collection: services } = useCollection({
		collectionPath: SERVICES_COLLECTION,
		order: 'order',
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
									return <ServicesCard key={service.name} service={service} />;
								} else return null;
							})}
							<Collapse isOpen={showAll}>
								<Row className='row-grid justify-content-center'>
									{services.map((service, index) => {
										if (index > 2) {
											return (
												<ServicesCard key={service.name} service={service} />
											);
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
