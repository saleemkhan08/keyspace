import React from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
} from 'reactstrap';

import './services-card.scss';

const ServicesCard = ({ record }) => {
	return (
		<Card className='shadow mt-3 mb-3 pr-1 pl-1 pt-1'>
			<CardImg
				className='pr-3 pl-3 pt-3'
				top
				src={record?.photoUrl}
				alt={record?.name}
			/>
			<CardBody>
				<CardTitle className='service-card-title'>{record?.name}</CardTitle>
				{/* <CardSubtitle>Card subtitle</CardSubtitle>
					<CardText>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</CardText> */}
				<Button color='primary' outline size='sm'>
					Subscribe
				</Button>
			</CardBody>
		</Card>
	);
};

export default ServicesCard;
