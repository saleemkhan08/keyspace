/*eslint-disable*/
import React from 'react';
// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

import './footer.scss';

class SimpleFooter extends React.Component {
	render() {
		return (
			<>
				<footer className=' footer'>
					<Container>
						<Row className=' align-items-center justify-content-md-between'>
							<Col md='6'>
								<div className='copyright'>
									<span className='bold'>KEY</span>
									{`SPACE © ${new Date().getFullYear()}`}
								</div>
							</Col>
							<Col md='6'>
								<Nav className=' nav-footer justify-content-end'>
									<NavItem>
										<NavLink
											href='https://www.facebook.com/Think-1503208026557380'
											target='_blank'>
											<i className='fa fa-facebook-square footer-link-icon' />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											href='https://www.instagram.com/saleemkhan08/'
											target='_blank'>
											<i className='fa fa-instagram footer-link-icon' />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											href='https://twitter.com/KeySpaceIndia'
											target='_blank'>
											<i className='fa fa-twitter-square footer-link-icon' />
										</NavLink>
									</NavItem>
								</Nav>
							</Col>
						</Row>
					</Container>
				</footer>
			</>
		);
	}
}

export default SimpleFooter;
