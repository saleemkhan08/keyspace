import React, { useState } from 'react';
import UsersTab from './UsersTab.js';
import PropertiesTab from './PropertiesTab/PropertiesTab.js';
import ServicesTab from './ServicesTab/ServicesTab.js';
import ComplaintsTab from './ComplaintsTab.js';
import EnquiriesTab from './EnquiriesTab.js';
import './styles.scss';
import SubscriptionsTab from './SubscriptionsTab.js';

const navigationList = [
	{ id: 'users', name: 'Users', icon: 'group' },
	{ id: 'employees', name: 'Employees', icon: 'admin_panel_settings' },
	{ id: 'subscriptions', name: 'Subscriptions', icon: 'repeat' },
	{ id: 'properties', name: 'Properties', icon: 'business' },
	{ id: 'services', name: 'Services', icon: 'build' },
	{ id: 'complaints', name: 'Complaints', icon: 'chat' },
	{ id: 'enquiries', name: 'Enquiries', icon: 'contact_support' },
];

const DashboardPage = () => {
	const [pageId, setPageId] = useState(navigationList[0].id);
	let page;
	switch (pageId) {
		case 'users': {
			page = <UsersTab />;
			break;
		}
		case 'employees': {
			page = <UsersTab showEmployees />;
			break;
		}
		case 'subscriptions': {
			page = <SubscriptionsTab />;
			break;
		}
		case 'properties': {
			page = <PropertiesTab />;
			break;
		}
		case 'services': {
			page = <ServicesTab />;
			break;
		}
		case 'complaints': {
			page = <ComplaintsTab />;
			break;
		}
		case 'enquiries': {
			page = <EnquiriesTab />;
			break;
		}
		default:
			page = <UsersTab />;
			break;
	}
	return (
		<div className='bg-gradient-secondary'>
			<div className='dashboard-page-container'>
				<div className='dashboard-navigation-container'>
					{navigationList?.map(({ id, name, icon }) => (
						<div
							key={id}
							className={`dashboard-navigation-item ${
								id === pageId ? 'selected' : ''
							}`}
							onClick={() => {
								setPageId(id);
							}}>
							<span className='material-icons dashboard-navigation-item-icon'>
								{icon}
							</span>
							<span className='dashboard-navigation-item-text hidden-mobile'>
								{name}
							</span>
						</div>
					))}
				</div>
				<div className='dashboard-tabs-container'>{page}</div>
			</div>
		</div>
	);
};

export default DashboardPage;
