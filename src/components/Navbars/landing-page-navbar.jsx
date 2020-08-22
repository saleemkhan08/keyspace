import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';

// reactstrap components
import {
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	Nav,
	Container,
	Row,
	Col,
	NavLink,
} from 'reactstrap';

import './landing-page-navbar.scss';
const LandingPageNavbar = ({ onLogin, onLogout, isLoggedIn }) => {
	const [collapseClasses, setCollapseClasses] = useState('');
	const [openCollapse, setOpenCollapse] = useState(false);
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

	const navBtnIconClass = `fa ${
		isLoggedIn ? 'fa-sign-out' : 'fa-google'
	} navbar-link-icon`;
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
							<img
								alt='...'
								src={require('assets/img/brand/keyspaceHorizontalLogo.png')}
							/>
						</NavbarBrand>
						<button
							className='navbar-toggler'
							onClick={() => setOpenCollapse(true)}>
							<span className='navbar-toggler-icon' />
						</button>
						{/* TODO Make this controlled collapse */}
						<Collapse
							isOpen={openCollapse}
							navbar
							className={collapseClasses}
							onExiting={onExiting}
							onExited={onExited}>
							<div className='navbar-collapse-header'>
								<Row>
									<Col className='collapse-brand' xs='6'>
										<Link to='/'>
											<img
												alt='...'
												className='brand-icon'
												src={require('assets/img/brand/keyspaceHorizontalBlueLogo.png')}
											/>
										</Link>
									</Col>
									<Col className='collapse-close' xs='6'>
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
									<NavItem>
										<NavLink
											className='nav-link-icon navbar-link-container'
											to='/profile'
											tag={Link}>
											<i className='fa fa-user-circle navbar-link-icon' />
											<span className='nav-link-inner--text ml-2 navbar-link-text'>
												Profile
											</span>
										</NavLink>
									</NavItem>
								)}

								<NavItem>
									<NavLink
										className='nav-link-icon navbar-link-container'
										onClick={handleNavButtonClick}>
										<i className={navBtnIconClass} />
										<span className='nav-link-inner--text ml-2 navbar-link-text'>
											{navBtnText}
										</span>
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
};

export default LandingPageNavbar;
