import React, { useState } from 'react';
import {
	Button,
	PopoverBody,
	PopoverHeader,
	UncontrolledPopover,
} from 'reactstrap';
import { COMPLAINTS } from 'globalState/ComplaintSlice.js';
import { useCollection } from 'globalState/index.js';
import CreateComplaintModal from './CreateComplaintModal.js';
import './styles.scss';
import { useAuth } from 'globalState/index.js';
import ComplaintsList from 'components/ComplaintList/index.js';

const Support = () => {
	const [showCreatTicketModal, setShowCreatTicketModal] = useState(false);
	const currentUser = useAuth();
	const { collection: complaintsList, updateDoc, deleteDoc } = useCollection({
		collectionPath: COMPLAINTS,
		order: 'order',
		filter: { field: 'uid', operator: '==', value: currentUser.uid },
	});
	return (
		<>
			<div className='support-tab-container'>
				<div className='support-tab-title-container'>
					<h3>
						Complaints
						<span
							className='fa fa-info complaints-info-icon'
							id='complaints-info'
						/>
						<UncontrolledPopover
							trigger='hover'
							placement='right'
							target='complaints-info'>
							<PopoverHeader>Please Note</PopoverHeader>
							<PopoverBody>
								<p>
									If any type of maintenance service is required then based on
									duration on living some percentage of the bill has to be paid
									by tenant
								</p>
								<ul>
									<li>Less than a month : 0% </li>
									<li>More than a month but less than 3 months : 25 %</li>
									<li>More than 3 months 50%</li>
									<li> More than a year 75%</li>
								</ul>
							</PopoverBody>
						</UncontrolledPopover>
					</h3>
					<Button
						className='create-new-ticket-button'
						outline
						color='primary'
						size='sm'
						onClick={() => setShowCreatTicketModal(true)}>
						Create New
					</Button>
				</div>
				<ComplaintsList
					complaintsList={complaintsList}
					updateDoc={updateDoc}
					deleteDoc={deleteDoc}
				/>
			</div>
			<CreateComplaintModal
				isOpen={showCreatTicketModal}
				onToggle={() => {
					setShowCreatTicketModal(!showCreatTicketModal);
				}}
			/>
		</>
	);
};

export default Support;
