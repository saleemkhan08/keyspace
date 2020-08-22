import React from 'react';
import { NavItem, Button } from 'reactstrap';

export const LoginButton = ({ isLoggedIn, onLogout, onLogin }) => {
	return (
		<NavItem className='d-none d-lg-block ml-lg-4'>
			<Button
				className='btn-neutral btn-icon'
				color='default'
				onClick={() => {
					isLoggedIn ? onLogout() : onLogin();
				}}>
				<span className='btn-inner--icon'>
					<i className='ni ni-single-02' />
				</span>
				<span className='nav-link-inner--text ml-1'>
					{isLoggedIn ? 'Logout' : 'Login'}
				</span>
			</Button>
		</NavItem>
	);
};
