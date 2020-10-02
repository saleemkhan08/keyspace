import React, { createElement } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import './styles.scss';

const TabLink = ({ name, icon, onClick, active, rounded }) => {
	let linkClass = rounded
		? 'tab-link-text rounded-circle'
		: 'tab-link-text nav-pill-text mb-sm-3 mb-md-0';
	if (active) {
		linkClass += ' active';
	}
	const iconClass = rounded
		? 'nav-pill-icon nav-link-icon d-block'
		: 'nav-pill-icon mr-2 mb-1';
	return (
		<NavItem className='tab-link'>
			<NavLink
				aria-selected={active}
				className={linkClass}
				onClick={onClick}
				role='tab'>
				<span className={iconClass}>{createElement(icon)}</span>
				{!rounded && name}
			</NavLink>
		</NavItem>
	);
};

export default TabLink;
