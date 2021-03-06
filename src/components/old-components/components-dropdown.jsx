import React from 'react';
import { Link } from 'react-router-dom';
import {
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledDropdown,
	Media,
	Nav,
} from 'reactstrap';

export const ComponentsDropdowns = () => {
	return (
		<Nav className='navbar-nav-hover align-items-lg-center' navbar>
			<UncontrolledDropdown nav>
				<DropdownToggle nav>
					<i className='ni ni-ui-04 d-lg-none mr-1' />
					<span className='nav-link-inner--text'>Components</span>
				</DropdownToggle>
				<DropdownMenu className='dropdown-menu-xl'>
					<div className='dropdown-menu-inner'>
						<Media
							className='d-flex align-items-center'
							href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar'
							target='_blank'>
							<div className='icon icon-shape bg-gradient-primary rounded-circle text-white'>
								<i className='ni ni-spaceship' />
							</div>
							<Media body className='ml-3'>
								<h6 className='heading text-primary mb-md-1'>
									Getting started
								</h6>
								<p className='description d-none d-md-inline-block mb-0'>
									Learn how to use Argon compiling Scss, change brand colors and
									more.
								</p>
							</Media>
						</Media>
						<Media
							className='d-flex align-items-center'
							href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar'
							target='_blank'>
							<div className='icon icon-shape bg-gradient-success rounded-circle text-white'>
								<i className='ni ni-palette' />
							</div>
							<Media body className='ml-3'>
								<h6 className='heading text-primary mb-md-1'>Foundation</h6>
								<p className='description d-none d-md-inline-block mb-0'>
									Learn more about colors, typography, icons and the grid system
									we used for Argon.
								</p>
							</Media>
						</Media>
						<Media
							className='d-flex align-items-center'
							href='https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar'
							target='_blank'>
							<div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
								<i className='ni ni-ui-04' />
							</div>
							<Media body className='ml-3'>
								<h5 className='heading text-warning mb-md-1'>Components</h5>
								<p className='description d-none d-md-inline-block mb-0'>
									Browse our 50 beautiful handcrafted components offered in the
									Free version.
								</p>
							</Media>
						</Media>
					</div>
				</DropdownMenu>
			</UncontrolledDropdown>
			<UncontrolledDropdown nav>
				<DropdownToggle nav>
					<i className='ni ni-collection d-lg-none mr-1' />
					<span className='nav-link-inner--text'>Examples</span>
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem to='/landing-page' tag={Link}>
						Landing
					</DropdownItem>
					<DropdownItem to='/profile-page' tag={Link}>
						Profile
					</DropdownItem>
					<DropdownItem to='/login-page' tag={Link}>
						Login
					</DropdownItem>
					<DropdownItem to='/register-page' tag={Link}>
						Register
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</Nav>
	);
};
