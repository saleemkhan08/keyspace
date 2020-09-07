import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

export default ({ route, icon, text, onClick }) => {
	return (
		<NavItem>
			{route ? (
				<NavLink
					className='nav-link-icon navbar-link-container primary'
					to={route}
					tag={Link}>
					<i className={`${icon} navbar-link-icon`} />
					<span className='nav-link-inner--text ml-2 navbar-link-text'>
						{text}
					</span>
				</NavLink>
			) : (
				<NavLink
					className='nav-link-icon navbar-link-container primary'
					onClick={onClick}>
					<i className={`${icon} navbar-link-icon`} />
					<span className='nav-link-inner--text ml-2 navbar-link-text'>
						{text}
					</span>
				</NavLink>
			)}
		</NavItem>
	);
};
