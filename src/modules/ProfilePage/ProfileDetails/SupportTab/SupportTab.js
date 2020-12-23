import { useCollection } from 'globalState/index.js';
import React, { useState } from 'react';
import {
	Button,
	PopoverBody,
	PopoverHeader,
	UncontrolledPopover,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import CreateComplaintModal from './CreateComplaintModal.js';
import { DateTime } from 'i18n/util';
import './styles.scss';
import { useAuth } from 'globalState/index.js';

export const COMPLAINTS_TYPES = Object.freeze({
	PLUMBING: 'Plumbing',
	WASTE_DISPOSAL: 'Waste Disposal',
	ELECTRICAL: 'Electrical',
	CARPENTER: 'Carpenter',
	OTHERS: 'Others',
});
export const COMPLAINTS = 'complaints';
export const STATUS_TYPES_TEXT = Object.freeze({
	OPEN: {
		key: 'OPEN',
		value: 'Open',
	},
	WORK_IN_PROGRESS: {
		key: 'WORK_IN_PROGRESS',
		value: 'Work In Progress',
	},
	RESOLVED: {
		key: 'RESOLVED',
		value: 'Resolved',
	},
	RE_OPEN: {
		key: 'RE_OPEN',
		value: 'Reopened',
	},
});

export const STATUS_TYPES_OPEN = [
	STATUS_TYPES_TEXT.WORK_IN_PROGRESS,
	STATUS_TYPES_TEXT.RESOLVED,
];

export const STATUS_TYPES_WORK_IN_PROGRESS = [STATUS_TYPES_TEXT.RESOLVED];
export const STATUS_TYPES_RESOLVED = [STATUS_TYPES_TEXT.RE_OPEN];
export const STATUS_TYPES_RE_OPEN = [
	STATUS_TYPES_TEXT.WORK_IN_PROGRESS,
	STATUS_TYPES_TEXT.RESOLVED,
];

export const STATUS_TYPES = Object.freeze({
	OPEN: STATUS_TYPES_OPEN,
	WORK_IN_PROGRESS: STATUS_TYPES_WORK_IN_PROGRESS,
	RESOLVED: STATUS_TYPES_RESOLVED,
	RE_OPEN: STATUS_TYPES_RE_OPEN,
});

const Support = () => {
	const [showCreatTicketModal, setShowCreatTicketModal] = useState(false);
	const currentUser = useAuth();
	const { collection: complaintsList, updateDoc, deleteDoc } = useCollection({
		collectionPath: COMPLAINTS,
		order: 'order',
		filter: (ref) =>
			currentUser.uid ? ref.where('uid', '==', currentUser.uid) : ref,
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
				<div className='support-tab-list-container'>
					{complaintsList?.length ? (
						complaintsList.map((complaint) => (
							<div
								key={complaint.id}
								className={`support-tab-list-item-container ${complaint.status}`}>
								<h5 className='support-tab-list-item-title'>
									{complaint.title}
								</h5>
								<p className='support-tab-list-item-created-on'>
									{`Created On : `}
									<DateTime timestamp={complaint.createdOn} />
									{` | Type : ${complaint.type} `}
									{` | Status : ${STATUS_TYPES_TEXT[complaint.status]?.value}`}
								</p>
								<p className='support-tab-list-item-description'>
									{complaint.description}
								</p>
								{/* TODO provide option to add comments */}
								<div className='support-tab-list-item-edit-container'>
									<UncontrolledDropdown>
										<DropdownToggle caret color='default' size='sm'>
											Options
										</DropdownToggle>
										<DropdownMenu>
											{STATUS_TYPES[complaint.status]?.map((status) => {
												const newComplaint = {
													...complaint,
													status: status.key,
												};
												return (
													<DropdownItem
														key={status.key}
														onClick={() =>
															updateDoc({ id: complaint.id, doc: newComplaint })
														}>
														{status.value}
													</DropdownItem>
												);
											})}
											{/* TODO restrict to be deleted only by master user or the person who created it */}
											<DropdownItem onClick={() => deleteDoc(complaint.id)}>
												Delete
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</div>
							</div>
						))
					) : (
						<div className='emptyListMessage'> No Complaints found</div>
					)}
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
