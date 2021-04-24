import React, { useState } from 'react';
import {
	Button,
	Col,
	PopoverBody,
	PopoverHeader,
	Row,
	UncontrolledPopover,
} from 'reactstrap';
import servicesList from 'globalState/services.js';
import SubscriptionRequestModal from './SubscriptionRequestModal.js';
import './styles.scss';
import { useAuth } from 'globalState/index.js';

const ServiceCard = ({ service, onClick, action }) => {
	return (
		<Col
			xs='12'
			sm='6'
			md='6'
			lg='4'
			key={service.name}
			className='subscription-card-container'>
			<div
				className='subscription-card-img'
				style={{
					backgroundImage: `url(${service.photoUrl})`,
				}}
			/>
			<div className='subscription-card-info-container'>
				<h5 className='subscription-card-info-name'>{service.name}</h5>
				<p className='subscription-card-info-description'>
					{service.description}
				</p>
			</div>
			<div className='subscribe-button-container'>
				<Button className='subscribe-button' color='primary' onClick={onClick}>
					{action}
				</Button>
			</div>
		</Col>
	);
};

const SubscriptionsTab = () => {
	const [showSubsModal, setShowSubsModal] = useState(false);
	const [currentService, setCurrentService] = useState(null);
	const currentUser = useAuth();

	const handleSub = (service, subscribe) => {
		setShowSubsModal(subscribe);
		setCurrentService(service);
	};
	const subscriptions = [];
	return (
		<>
			<div className='support-tab-container'>
				<div className='support-tab-title-container'>
					<h3>
						Subscriptions
						<span
							className='fa fa-info complaints-info-icon'
							id='subscription-info'
						/>
						<UncontrolledPopover
							trigger='hover'
							placement='right'
							target='subscription-info'>
							<PopoverHeader>Please Note</PopoverHeader>
							<PopoverBody>
								<p>
									The services subscribed, will only be provided if people from
									more than 3 flats opt for the same service.
									<br />
									<br />
									You can track the number of people opted for the service in
									the subscription request card.
								</p>
							</PopoverBody>
						</UncontrolledPopover>
					</h3>
				</div>
			</div>
			<div>
				<Row>
					{servicesList
						?.filter((service) => !subscriptions.includes(service.id))
						.map((service) => (
							<ServiceCard
								key={service.id}
								service={service}
								onClick={() => handleSub(service, false)}
								action='Subscribe'
							/>
						))}
				</Row>
				<hr />
				<Row>
					{servicesList
						?.filter((service) => !subscriptions.includes(service.id))
						.map((service) => {
							return (
								<ServiceCard
									key={service.id}
									service={service}
									onClick={() => handleSub(service, true)}
									action='Subscribe'
								/>
							);
						})}
				</Row>
			</div>
			<SubscriptionRequestModal
				isOpen={showSubsModal}
				service={currentService}
				onToggle={() => {
					setShowSubsModal(!showSubsModal);
				}}
			/>
		</>
	);
};

export default SubscriptionsTab;
