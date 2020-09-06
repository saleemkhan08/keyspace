import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
import { Keyspace } from 'components/icons';
// reactstrap components
import {
	Collapse,
	NavbarBrand,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';

import NavItem from './nav-item';
import './navbar.scss';
import { ROUTES } from 'modules/routes';
import ProfileModal from 'modules/profile-page/profile-modal';
const LandingPageNavbar = ({ onLogin, onLogout, currentUser }) => {
	const [collapseClasses, setCollapseClasses] = useState('');
	const [openCollapse, setOpenCollapse] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);
	const isLoggedIn = !!currentUser;
	useEffect(() => {
		let headroom = new Headroom(document.getElementById('navbar-main'));
		// initialise
		headroom.init();
	});

	const onExiting = () => {
		setCollapseClasses('collapsing-out');
	};

	const onExited = () => {
		setCollapseClasses('');
	};

	const handleNavButtonClick = (event) => {
		event.preventDefault();
		isLoggedIn ? onLogout() : onLogin();
	};

	const navBtnIconClass = `fa ${isLoggedIn ? 'fa-sign-out' : 'fa-google'}`;
	const navBtnText = isLoggedIn ? 'Logout' : 'Login';
	return (
		<>
			<header className='header-global'>
				<Navbar
					className='navbar-main navbar-transparent navbar-light headroom'
					expand='lg'
					id='navbar-main'>
					<Container>
						<NavbarBrand className='mr-lg-5' to='/' tag={Link}>
							<span className='nav-brand-icon-and-text-container'>
								<Keyspace />|<span className='nav-brand-key-text'>KEY</span>
								<span className='nav-brand-space-text'>SPACE</span>
							</span>
						</NavbarBrand>
						<button
							className='navbar-toggler'
							onClick={() => setOpenCollapse(true)}>
							<span className='navbar-toggler-icon' />
						</button>
						<Collapse
							isOpen={openCollapse}
							navbar
							className={collapseClasses}
							onExiting={onExiting}
							onExited={onExited}>
							<div className='navbar-collapse-header'>
								<Row>
									<Col className='collapse-brand' xs='10'>
										<Link to='/'>
											<span className='nav-brand-icon-and-text-container'>
												<Keyspace />|
												<span className='nav-brand-key-text'>KEY</span>
												<span className='nav-brand-space-text'>SPACE</span>
											</span>
										</Link>
									</Col>
									<Col className='collapse-close' xs='2'>
										<button
											className='navbar-toggler'
											onClick={() => setOpenCollapse(false)}>
											<span />
											<span />
										</button>
									</Col>
								</Row>
							</div>
							<Nav className='align-items-lg-center ml-lg-auto' navbar>
								{isLoggedIn && (
									<NavItem
										onClick={() => setShowProfileModal(!showProfileModal)}
										icon='ni ni-single-02'
										text='Profile'
									/>
								)}
								<NavItem
									icon={navBtnIconClass}
									onClick={handleNavButtonClick}
									text={navBtnText}
								/>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</header>
			<ProfileModal
				currentUser={currentUser}
				isOpen={showProfileModal}
				toggleModal={() => setShowProfileModal(!showProfileModal)}
			/>
		</>
	);
};

export default LandingPageNavbar;
