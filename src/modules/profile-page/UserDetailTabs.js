import React, { useState, createElement } from 'react';
import classnames from 'classnames';
import { Home, Repeat, Rupee } from 'components/icons';
// reactstrap components
import { NavItem, NavLink, Nav, TabContent, TabPane } from 'reactstrap';

import './user-details.scss';
import AddressTab from './AddressTab';
import Support from './Support';
import Payments from './Payments';

const detailsList = [
	{
		name: 'Address',
		icon: Home,
	},
	{
		name: 'Subscriptions',
		icon: Repeat,
	},
	{
		name: 'Payments',
		icon: Rupee,
	},
];

const UserDetails = () => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const updateNavIndex = (e, index) => {
		e.preventDefault();
		setCurrentTabIndex(index);
	};

	return (
		<>
			<div className='nav-wrapper'>
				<Nav
					className='nav-pills-circle show-sm'
					id='tabs_2'
					pills
					role='tablist'>
					{detailsList.map((detail, index) => (
						<NavItem key={detail.name}>
							<NavLink
								aria-selected={currentTabIndex === index}
								className={classnames('rounded-circle', {
									active: currentTabIndex === index,
								})}
								onClick={(e) => updateNavIndex(e, index)}
								href='#keyspace'
								role='tab'>
								<span className='nav-link-icon d-block nav-pill-icon'>
									{createElement(detail.icon)}
								</span>
							</NavLink>
						</NavItem>
					))}
				</Nav>
				<Nav
					className='nav-fill flex-column flex-md-row hide-sm'
					id='tabs-icons-text'
					pills
					role='tablist'>
					{detailsList.map((detail, index) => (
						<NavItem key={detail.name}>
							<NavLink
								aria-selected={currentTabIndex === index}
								className={classnames('nav-pill-text mb-sm-3 mb-md-0', {
									active: currentTabIndex === index,
								})}
								onClick={(e) => updateNavIndex(e, index)}
								href='#keyspace'
								role='tab'>
								<span className='nav-pill-icon mr-2 mb-1'>
									{createElement(detail.icon)}
								</span>
								{detail.name}
							</NavLink>
						</NavItem>
					))}
				</Nav>
			</div>
			<div className='user-details-body'>
				<TabContent activeTab={'tabs' + currentTabIndex}>
					<TabPane tabId='tabs0'>
						<AddressTab />
					</TabPane>
					<TabPane tabId='tabs1'>
						<Support />
					</TabPane>
					<TabPane tabId='tabs2'>
						<Payments />
					</TabPane>
				</TabContent>
			</div>
		</>
	);
};

export default UserDetails;
