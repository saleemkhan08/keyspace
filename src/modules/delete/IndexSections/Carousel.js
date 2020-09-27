/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://keyspace.in/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://keyspace.in)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from 'reactstrap';

const items = [
	{
		src: require('assets/img/theme/img-1-1200x1000.jpg'),
		altText: '',
		caption: '',
		header: '',
	},
	{
		src: require('assets/img/theme/img-2-1200x1000.jpg'),
		altText: '',
		caption: '',
		header: '',
	},
];

class Carousel extends React.Component {
	render() {
		return (
			<>
				<section className='section section-shaped'>
					<Container className='py-md'>
						<Row className='justify-content-between align-items-center'>
							<Col className='mb-5 mb-lg-0' lg='5'>
								<h1 className='text-default font-weight-light'>
									Bootstrap carousel
								</h1>
								<p className='lead text-default mt-4'>
									Argon Design System comes with four pre-built pages to help
									you get started faster. You can change the text and images and
									you're good to go.
								</p>
								<Button className='btn-primary mt-4' color='primary' href='/'>
									See all components
								</Button>
							</Col>
							<Col className='mb-lg-auto' lg='6'>
								<div className='rounded shadow-lg overflow-hidden transform-perspective-right'>
									<UncontrolledCarousel items={items} />
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</>
		);
	}
}

export default Carousel;
