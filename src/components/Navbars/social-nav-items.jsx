import React from 'react';
import { NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';

export const SocialNavItems = () => {
	return (
		<>
			<NavItem>
				<NavLink
					className='nav-link-icon'
					href='https://www.facebook.com/creativetim'
					id='tooltip333589074'
					target='_blank'>
					<i className='fa fa-facebook-square' />
					<span className='nav-link-inner--text d-lg-none ml-2'>Facebook</span>
				</NavLink>
				<UncontrolledTooltip delay={0} target='tooltip333589074'>
					Like us on Facebook
				</UncontrolledTooltip>
			</NavItem>
			<NavItem>
				<NavLink
					className='nav-link-icon'
					href='https://www.instagram.com/creativetimofficial'
					id='tooltip356693867'
					target='_blank'>
					<i className='fa fa-instagram' />
					<span className='nav-link-inner--text d-lg-none ml-2'>Instagram</span>
				</NavLink>
				<UncontrolledTooltip delay={0} target='tooltip356693867'>
					Follow us on Instagram
				</UncontrolledTooltip>
			</NavItem>
			<NavItem>
				<NavLink
					className='nav-link-icon'
					href='https://twitter.com/creativetim'
					id='tooltip184698705'
					target='_blank'>
					<i className='fa fa-twitter-square' />
					<span className='nav-link-inner--text d-lg-none ml-2'>Twitter</span>
				</NavLink>
				<UncontrolledTooltip delay={0} target='tooltip184698705'>
					Follow us on Twitter
				</UncontrolledTooltip>
			</NavItem>
			<NavItem>
				<NavLink
					className='nav-link-icon'
					href='https://github.com/creativetimofficial/argon-design-system-react'
					id='tooltip112445449'
					target='_blank'>
					<i className='fa fa-github' />
					<span className='nav-link-inner--text d-lg-none ml-2'>Github</span>
				</NavLink>
				<UncontrolledTooltip delay={0} target='tooltip112445449'>
					Star us on Github
				</UncontrolledTooltip>
			</NavItem>
		</>
	);
};
