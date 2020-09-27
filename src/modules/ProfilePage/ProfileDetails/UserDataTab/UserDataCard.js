import React from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import Image from 'components/Image';
import './styles.scss';

const UserDataCard = ({ data, userDetails, onClick }) => {
	return (
		<Card className='userDataCardContainer mb-4'>
			<CardBody className='userDataCardBody'>
				<div className='user-data-type-image-container'>
					<Image
						className='user-data-type-image'
						id={data.key}
						src={userDetails[data.key]}
						alt={data.title}
						fallbackSrc={data.fallbackImg}
						onClick={onClick}
					/>
				</div>
				<div className='textContainer'>
					<h5 className='text-primary text-uppercase userDataCardTitle'>
						{data.title}
					</h5>
					<p className='userDataCardDescription'>
						{userDetails[data.key] ? data.description : data.placeholder}
					</p>
				</div>
				<Button
					className='userDataCardAction'
					color='primary'
					onClick={(e) => e.preventDefault()}>
					Upload
				</Button>
			</CardBody>
		</Card>
	);
};
export default UserDataCard;
