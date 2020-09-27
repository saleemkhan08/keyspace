/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Headroom from 'headroom.js';

import {
	Collapse,
	NavbarBrand,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';

import { ROUTES } from 'modules/routes.js';
import { auth } from 'globalState/firebase.js';
import { Keyspace } from 'components/Icons';

import NavItem from './NavItem.js';
import './styles.scss';

const LandingPageNavbar = ({ onLogin, currentUser, onNavigate }) => {
	const [collapseClasses, setCollapseClasses] = useState('');
	const [openCollapse, setOpenCollapse] = useState(false);
	const isLoggedIn = !!currentUser;
	const location = useLocation();
	useEffect(() => {
		let headroom = new Headroom(document.getElementById('navbar-main'));
		// initialise
		headroom.init();
		auth.currentUser?.getIdTokenResult()?.then((result) => {
			console.log('Salresult : ', { role: result.claims.role });
		});
	}, []);

	const headerClassName =
		location.pathname === ROUTES.PROFILE ? 'profile-header' : '';
	const onExiting = () => {
		setCollapseClasses('collapsing-out');
	};

	const onExited = () => {
		setCollapseClasses('');
	};
	return (
		<>
			<header className='header-global'>
				<Navbar
					className={`navbar-main navbar-light headroom navbar-transparent ${headerClassName}`}
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
								<NavItem
									onClick={() => onNavigate(ROUTES.ABOUT)}
									text='About'
								/>
								<NavItem
									onClick={() => onNavigate(ROUTES.CONTACT)}
									text='Contact'
								/>
								{isLoggedIn ? (
									<NavItem route={ROUTES.PROFILE} text='Profile' />
								) : (
									<NavItem icon='fa fa-google' onClick={onLogin} text='Login' />
								)}
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
};

export default LandingPageNavbar;
