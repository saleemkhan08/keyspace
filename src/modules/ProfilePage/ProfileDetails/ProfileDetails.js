import React, { useState } from 'react';
import { Details, Support, Rupee } from 'components/Icons';
// reactstrap components
import { Nav, TabContent, TabPane, Card, CardBody } from 'reactstrap';
import TabLink from 'components/TabLink/TabLink';

import DetailsTab from './UserDataTab';
import SupportTab from './SupportTab';
import Payments from './PaymentsTab';

import './styles.scss';

const detailsList = [
	{
		name: 'Details',
		icon: Details,
	},
	{
		name: 'Support',
		icon: Support,
	},
	{
		name: 'Payments',
		icon: Rupee,
	},
];

const UserDetails = () => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const updateNavIndex = (event, index) => {
		event.preventDefault();
		setCurrentTabIndex(index);
	};

	return (
		<>
			<div className='nav-wrapper'>
				<Nav className='nav-pills-circle show-sm' pills role='tablist'>
					{detailsList.map((detail, index) => (
						<TabLink
							key={detail.name}
							active={currentTabIndex === index}
							name={detail.name}
							icon={detail.icon}
							onClick={(event) => updateNavIndex(event, index)}
							rounded
						/>
					))}
				</Nav>
				<Nav
					className='nav-fill flex-column flex-md-row hide-sm'
					pills
					role='tablist'>
					{detailsList.map((detail, index) => (
						<TabLink
							key={detail.name}
							active={currentTabIndex === index}
							name={detail.name}
							icon={detail.icon}
							onClick={(event) => updateNavIndex(event, index)}
						/>
					))}
				</Nav>
			</div>
			<Card className='shadow mb-3 user-details-body'>
				<CardBody>
					<TabContent activeTab={'tabs' + currentTabIndex}>
						<TabPane tabId='tabs0'>
							<DetailsTab />
						</TabPane>
						<TabPane tabId='tabs1'>
							<SupportTab />
						</TabPane>
						<TabPane tabId='tabs2'>
							<Payments />
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</>
	);
};

export default UserDetails;
