import React, { useState } from 'react';
import './styles.scss';
// reactstrap components
import { NavItem, NavLink, Nav } from 'reactstrap';
import { useCollection } from 'globalState/firestoreHooks';
import { COMPLAINTS, STATUS_TYPES_TEXT } from 'globalState/ComplaintSlice.js';
import ComplaintsList from 'components/ComplaintList';

const ComplaintsTab = () => {
	const statusTypeKeys = Object.keys(STATUS_TYPES_TEXT);
	const [tabId, setTabId] = useState(statusTypeKeys[0]);
	const { collection: complaintsList, updateDoc, deleteDoc } = useCollection({
		collectionPath: COMPLAINTS,
		order: 'order',
		filter: { field: 'status', operator: '==', value: tabId },
	});
	const toggleNavs = (index) => {
		setTabId(index);
	};
	return (
		<div className='complaints-tab-container'>
			<h3 className='complaints-tab-title'>Complaints</h3>
			<div className='complaints-tab-nav-wrapper'>
				<Nav
					className='nav-fill flex-row complaint-tab-nav'
					pills
					role='tablist'>
					{statusTypeKeys?.map((id) => {
						const { key, value, icon } = STATUS_TYPES_TEXT[id];
						const isSelected = tabId === id;
						return (
							<NavItem key={key} className='complaint-tab-nav-item'>
								<NavLink
									aria-selected={isSelected}
									className={`mb-sm-3 mb-md-0 complaint-tab-nav-link ${
										isSelected && 'active'
									}`}
									onClick={() => toggleNavs(key)}
									role='tab'>
									<div
										className={`complaint-tab-nav-link-text-container ${
											isSelected && 'active complaint-tab-nav-link-selected'
										}`}>
										<span className='material-icons'>{icon}</span>
										<span className='complaint-tab-nav-item-text hidden-mobile'>
											&nbsp; {value}
										</span>
									</div>
								</NavLink>
							</NavItem>
						);
					})}
				</Nav>
			</div>
			<ComplaintsList
				complaintsList={complaintsList}
				updateDoc={updateDoc}
				deleteDoc={deleteDoc}
			/>
		</div>
	);
};

export default ComplaintsTab;
