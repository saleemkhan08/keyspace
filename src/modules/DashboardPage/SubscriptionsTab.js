import React from 'react';
import { SUBSCRIPTIONS } from 'globalState/SubscriptionsSlice';
import { useCollection } from 'globalState/firestoreHooks';

import './styles.scss';
import { Button, Col, Row } from 'reactstrap';
import { DateTime } from 'i18n/util';

const SubscriptionsTab = () => {
	const { collection: subscriptionsList, deleteDoc } = useCollection({
		collectionPath: SUBSCRIPTIONS,
		order: 'order',
	});

	return (
		<div className='enquiry-tab-container'>
			<h3 className='enquiry-tab-title'>Subscriptions Requests</h3>
			{subscriptionsList?.length ? (
				<Row className='enquiry-tab-list-container'>
					{subscriptionsList.map((requestItem) => (
						<Col
							xs='12'
							sm='6'
							md='6'
							lg='4'
							key={requestItem.id}
							className='enquiry-tab-list-col-container'>
							<div className='enquiry-tab-list-item-container'>
								<div className='enquiry-tab-list-item-message-container'>
									<h5 className='enquiry-tab-list-item-message'>
										{requestItem.enquiry}
									</h5>
									<Button
										className='delete-enquiry-button'
										outline
										color='danger'
										size='sm'
										onClick={() => deleteDoc(requestItem.id)}>
										Delete
									</Button>
								</div>
								<div className='enquiry-tab-list-item-info-container'>
									<p className='enquiry-tab-list-item-info-item'>
										{`Name : ${requestItem.name}`}
									</p>
									<p className='enquiry-tab-list-item-info-item'>
										{`Email : ${requestItem.email}`}
									</p>
									{requestItem.mobileNumber && (
										<p className='enquiry-tab-list-item-info-item'>
											{`Phone : ${requestItem.mobileNumber}`}
										</p>
									)}
									<p className='enquiry-tab-list-item-info-item'>
										{`Created On : `}
										<DateTime timestamp={requestItem.createdOn} />
									</p>
								</div>
							</div>
						</Col>
					))}
				</Row>
			) : (
				<div className='emptyListMessage'> No Requests Yet</div>
			)}
		</div>
	);
};

export default SubscriptionsTab;
