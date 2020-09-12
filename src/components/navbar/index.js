/* eslint-disable no-unused-expressions */
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

import { ROUTES } from 'modules/routes.js';
import NavItem from './nav-item';
import './navbar.scss';
import ProfileModal from 'modules/profile-page/ProfileModal.js';
import { auth } from '../../firebase.js';

const LandingPageNavbar = ({ onLogin, currentUser, onNavigate }) => {
	const [collapseClasses, setCollapseClasses] = useState('');
	const [openCollapse, setOpenCollapse] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);
	const isLoggedIn = !!currentUser;

	useEffect(() => {
		let headroom = new Headroom(document.getElementById('navbar-main'));
		// initialise
		headroom.init();
		auth.currentUser?.getIdTokenResult()?.then((result) => {
			console.log('Salresult : ', { role: result.claims.role });
		});
	}, []);

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
								<NavItem
									onClick={() => onNavigate(ROUTES.ABOUT)}
									text='About'
								/>
								<NavItem
									onClick={() => onNavigate(ROUTES.CONTACT)}
									text='Contact'
								/>
								{isLoggedIn ? (
									<NavItem
										onClick={() => setShowProfileModal(!showProfileModal)}
										text='Profile'
									/>
								) : (
									<NavItem icon='fa fa-google' onClick={onLogin} text='Login' />
								)}
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
