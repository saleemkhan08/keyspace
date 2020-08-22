import React, { useState } from 'react';
import classnames from 'classnames';
// reactstrap components
import {
	Card,
	CardBody,
	NavItem,
	NavLink,
	Nav,
	TabContent,
	TabPane,
} from 'reactstrap';

import './user-details.scss';

const UserDetails = () => {
	const [currentTabIndex, setCurrentTabIndex] = useState(1);

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
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 1}
							className={classnames('rounded-circle', {
								active: currentTabIndex === 1,
							})}
							onClick={(e) => updateNavIndex(e, 1)}
							href='#pablo'
							role='tab'>
							<span className='nav-link-icon d-block'>
								<i className='ni ni-atom' />
							</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 2}
							className={classnames('rounded-circle', {
								active: currentTabIndex === 2,
							})}
							onClick={(e) => updateNavIndex(e, 2)}
							href='#pablo'
							role='tab'>
							<span className='nav-link-icon d-block'>
								<i className='ni ni-chat-round' />
							</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 3}
							className={classnames('rounded-circle', {
								active: currentTabIndex === 3,
							})}
							onClick={(e) => updateNavIndex(e, 3)}
							href='#pablo'
							role='tab'>
							<span className='nav-link-icon d-block'>
								<i className='ni ni-cloud-download-95' />
							</span>
						</NavLink>
					</NavItem>
				</Nav>
				<Nav
					className='nav-fill flex-column flex-md-row hide-sm'
					id='tabs-icons-text'
					pills
					role='tablist'>
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 1}
							className={classnames('mb-sm-3 mb-md-0', {
								active: currentTabIndex === 1,
							})}
							onClick={(e) => updateNavIndex(e, 1)}
							href='#pablo'
							role='tab'>
							<i className='ni ni-cloud-upload-96 mr-2' />
							Home
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 2}
							className={classnames('mb-sm-3 mb-md-0', {
								active: currentTabIndex === 2,
							})}
							onClick={(e) => updateNavIndex(e, 2)}
							href='#pablo'
							role='tab'>
							<i className='ni ni-bell-55 mr-2' />
							Profile
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							aria-selected={currentTabIndex === 3}
							className={classnames('mb-sm-3 mb-md-0', {
								active: currentTabIndex === 3,
							})}
							onClick={(e) => updateNavIndex(e, 3)}
							href='#pablo'
							role='tab'>
							<i className='ni ni-calendar-grid-58 mr-2' />
							Messages
						</NavLink>
					</NavItem>
				</Nav>
			</div>
			<Card className='shadow'>
				<CardBody className='user-details-card-body'>
					<TabContent activeTab={'tabs' + currentTabIndex}>
						<TabPane tabId='tabs1'>
							<p className='description'>
								Raw denim you probably haven't heard of them jean shorts Austin.
								Nesciunt tofu stumptown aliqua, retro synth master cleanse.
								Mustache cliche tempor, williamsburg carles vegan helvetica.
								Reprehenderit butcher retro keffiyeh dreamcatcher synth.
							</p>
							<p className='description'>
								Raw denim you probably haven't heard of them jean shorts Austin.
								Nesciunt tofu stumptown aliqua, retro synth master cleanse.
							</p>
						</TabPane>
						<TabPane tabId='tabs2'>
							<p className='description'>
								Cosby sweater eu banh mi, qui irure terry richardson ex squid.
								Aliquip placeat salvia cillum iphone. Seitan aliquip quis
								cardigan american apparel, butcher voluptate nisi qui.
							</p>
						</TabPane>
						<TabPane tabId='tabs3'>
							<p className='description'>
								Raw denim you probably haven't heard of them jean shorts Austin.
								Nesciunt tofu stumptown aliqua, retro synth master cleanse.
								Mustache cliche tempor, williamsburg carles vegan helvetica.
								Reprehenderit butcher retro keffiyeh dreamcatcher synth.
							</p>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</>
	);
};

export default UserDetails;
