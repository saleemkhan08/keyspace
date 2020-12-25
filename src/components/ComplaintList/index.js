import React from 'react';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import { STATUS_TYPES, STATUS_TYPES_TEXT } from 'globalState/ComplaintSlice.js';
import { DateTime } from 'i18n/util';
import './styles.scss';

const ComplaintsList = ({ complaintsList, updateDoc, deleteDoc }) => (
	<div className='support-tab-list-container'>
		{complaintsList?.length ? (
			complaintsList.map((complaint) => (
				<div
					key={complaint.id}
					className={`support-tab-list-item-container ${complaint.status}`}>
					<h5 className='support-tab-list-item-title'>{complaint.title}</h5>
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
						<UncontrolledDropdown direction='left'>
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
);

export default ComplaintsList;
