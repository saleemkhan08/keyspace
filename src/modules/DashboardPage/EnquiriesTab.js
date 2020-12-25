import React from 'react';
import { ENQURIES } from 'globalState/EnquiriesSlice';
import { useCollection } from 'globalState/firestoreHooks';

import './styles.scss';
import { Button, Col, Row } from 'reactstrap';
import { DateTime } from 'i18n/util';

const EnquiriesTab = () => {
	const { collection: enquiriesList, deleteDoc } = useCollection({
		collectionPath: ENQURIES,
		order: 'order',
	});

	return (
		<div className='enquiry-tab-container'>
			<h3 className='enquiry-tab-title'>Enquiries</h3>
			{enquiriesList?.length ? (
				<Row className='enquiry-tab-list-container'>
					{enquiriesList.map((enquiryItem) => (
						<Col
							xs='12'
							sm='6'
							md='6'
							lg='4'
							key={enquiryItem.id}
							className='enquiry-tab-list-col-container'>
							<div className='enquiry-tab-list-item-container'>
								<div className='enquiry-tab-list-item-message-container'>
									<h5 className='enquiry-tab-list-item-message'>
										{enquiryItem.enquiry}
									</h5>
									<Button
										className='delete-enquiry-button'
										outline
										color='danger'
										size='sm'
										onClick={() => deleteDoc(enquiryItem.id)}>
										Delete
									</Button>
								</div>
								<div className='enquiry-tab-list-item-info-container'>
									<p className='enquiry-tab-list-item-info-item'>
										{`Name : ${enquiryItem.name}`}
									</p>
									<p className='enquiry-tab-list-item-info-item'>
										{`Email : ${enquiryItem.email}`}
									</p>
									{enquiryItem.mobileNumber && (
										<p className='enquiry-tab-list-item-info-item'>
											{`Phone : ${enquiryItem.mobileNumber}`}
										</p>
									)}
									<p className='enquiry-tab-list-item-info-item'>
										{`Created On : `}
										<DateTime timestamp={enquiryItem.createdOn} />
									</p>
								</div>
							</div>
						</Col>
					))}
				</Row>
			) : (
				<div className='emptyListMessage'> No Enquiries Yet</div>
			)}
		</div>
	);
};

export default EnquiriesTab;
