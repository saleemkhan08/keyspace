import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Nav, NavItem, Row, NavLink } from 'reactstrap';
import { useCollection } from 'globalState/firestoreHooks';
import {
	EmployeeTypes,
	UsersTypes,
	USER_COLLECTION,
	OPTIONS_ROLE_MAP,
	COMMON_OPTIONS,
	updateRole,
	generateBill,
	paymentReminder,
	acknowledgePayment,
	subscriptions,
	flatsAssignment,
	payStatement,
	propertiesAssignment,
	servicesAssignment,
	modulesAccess,
} from 'globalState/authSlice';
import UpdateRoles from 'modules/Components/UserActions/UpdateRoles';
import OptionsDropdown from 'components/OptionsDropdown';

const UsersTab = ({ showEmployees }) => {
	const [action, setAction] = useState({});
	const [navTypes, title] = showEmployees
		? [EmployeeTypes, 'Employees']
		: [UsersTypes, 'Users'];
	const [tabId, setTabId] = useState(navTypes[0].role);

	const { collection: usersList, updateDoc, isLoading } = useCollection({
		collectionPath: USER_COLLECTION,
		order: 'name',
		filter: { field: 'roles', operator: 'array-contains', value: tabId },
	});
	const toggleNavs = (index) => {
		setTabId(index);
	};
	console.log('SalshowEmployees : ', {
		showEmployees,
		tabId,
		action,
		role: navTypes[0].role,
	});
	useEffect(() => {
		if (tabId !== navTypes[0].role) setTabId(navTypes[0].role);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showEmployees]);

	return (
		<>
			<div className='users-tab-container'>
				<div className='users-tab-title-container'>
					<h3 className='users-tab-title'>{title}</h3>
				</div>
				<div className='users-tab-nav-wrapper'>
					<Nav className='nav-fill flex-row users-tab-nav' pills role='tablist'>
						{navTypes?.map(({ role, title }) => {
							const isSelected = tabId === role;
							return (
								<NavItem key={role} className='users-tab-nav-item'>
									<NavLink
										aria-selected={isSelected}
										className={`mb-sm-3 mb-md-0 users-tab-nav-link ${
											isSelected && 'active'
										}`}
										onClick={() => toggleNavs(role)}
										role='tab'>
										<div
											className={`users-tab-nav-link-text-container ${
												isSelected && 'active users-tab-nav-link-selected'
											}`}>
											<span className='users-tab-nav-item-text'>{title}</span>
										</div>
									</NavLink>
								</NavItem>
							);
						})}
					</Nav>
				</div>
				<Row className='users-tab-list-container'>
					{usersList?.map((user) => {
						const roleOptionsTemp = [
							...COMMON_OPTIONS,
							...(OPTIONS_ROLE_MAP[tabId] || []),
						]; // getOptions(user.roles);
						const roleOptions = roleOptionsTemp.map((roleOption) => ({
							...roleOption,
							onClick: () => setAction({ key: roleOption.key, user }),
						}));
						return (
							<Col
								xs='12'
								sm='6'
								md='6'
								lg='4'
								key={user.name}
								className='users-tab-list-col-container'>
								<div className='users-tab-list-item-container'>
									<div className='users-tab-item-details-conatiner'>
										<div
											style={{ backgroundImage: `url(${user.photoUrl})` }}
											className='users-tab-item-image'
										/>
										<div className='users-tab-item-text-container'>
											<h5 className='users-tab-list-item-name'>{user.name}</h5>
											<p className='users-tab-list-item-email'>{user.email}</p>
										</div>
									</div>
									<div className='users-tab-list-item-action-container'>
										{<OptionsDropdown options={roleOptions} />}
									</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</div>
			<UpdateRoles
				isOpen={action.key === updateRole}
				onToggle={() => {
					setAction({});
				}}
				userData={action.user}
				updateDoc={updateDoc}
				isLoading={isLoading}
			/>
		</>
	);
};

export default UsersTab;
