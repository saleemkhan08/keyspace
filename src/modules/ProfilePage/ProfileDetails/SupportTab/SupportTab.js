import React, { useState } from 'react';
import {
	Button,
	PopoverBody,
	PopoverHeader,
	UncontrolledPopover,
} from 'reactstrap';
import CreateComplaintModal from './CreateComplaintModal.js';
import './styles.scss';

const COMPLAINTS_TYPES = Object.freeze({
	PLUMBING: 'Plumbing',
	WASTE_DISPOSAL: 'Waste Disposal',
	ELECTRICAL: 'Electrical',
	CARPENTER: 'Carpenter',
	OTHERS: 'Others',
});

const STATUS_TYPES = Object.freeze({
	OPEN: 'Open',
	WORK_IN_PROGRESS: 'Work In Progress',
	RESOLVED: 'Resolved',
	RE_OPEN: 'Reopened',
});

const mockData = [
	{
		id: 1001,
		title: 'Sample complaint1',
		description:
			'This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines',
		status: STATUS_TYPES.OPEN,
		type: COMPLAINTS_TYPES.OTHERS,
		createdOn: '23/08/2020',
	},
	{
		id: 1002,
		title: 'Sample complaint2',
		description:
			'This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines',
		status: STATUS_TYPES.WORK_IN_PROGRESS,
		type: COMPLAINTS_TYPES.PLUMBING,
		createdOn: '23/08/2020',
	},
	{
		id: 1003,
		title: 'Sample complaint3',
		description:
			'This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines',
		status: STATUS_TYPES.RESOLVED,
		type: COMPLAINTS_TYPES.WASTE_DISPOSAL,
		createdOn: '23/08/2020',
	},
	{
		id: 1004,
		title: 'Sample complaint4',
		description:
			'This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines',
		status: STATUS_TYPES.RE_OPEN,
		type: COMPLAINTS_TYPES.ELECTRICAL,
		createdOn: '23/08/2020',
	},
	{
		id: 1005,
		title: 'Sample complaint5',
		description:
			'This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines This is a smaple description to show it in 2 lines. This is a smaple description to show it in 2 lines',
		status: STATUS_TYPES.WORK_IN_PROGRESS,
		type: COMPLAINTS_TYPES.CARPENTER,
		createdOn: '23/08/2020',
	},
];

const Support = () => {
	const [showCreatTicketModal, setShowCreatTicketModal] = useState(false);
	// TODO Fetch data from backend
	const complaintsList = mockData;
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
						onClick={() => setShowCreatTicketModal(true)}>
						Create New
					</Button>
				</div>
				<div className='support-tab-list-container'>
					{complaintsList.map((complaint) => (
						<div key={complaint.id} className='support-tab-list-item-container'>
							<h5 className='support-tab-list-item-title'>{complaint.title}</h5>
							<p className='support-tab-list-item-created-on'>
								{`Created On : ${complaint.createdOn}`}
								{` | Type : ${complaint.type} `}
								{` | Status : ${complaint.status}`}
							</p>
							<p className='support-tab-list-item-description'>
								{complaint.description}
							</p>
						</div>
					))}
				</div>
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
