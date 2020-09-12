import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { ROUTES } from 'modules/routes';
import './styles.scss';

const Contact = ({ currentPosition }) => {
	const [nameFocused, setNameFocused] = useState(false);
	const [emailFocused, setEmailFocused] = useState(false);

	const positionRef = useRef(null);
	useEffect(() => {
		if (currentPosition === ROUTES.CONTACT) {
			positionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [currentPosition]);

	return (
		<section
			ref={positionRef}
			className='section section-lg pt-lg-0 section-contact-us'>
			<Container>
				<Row className='justify-content-center mt--300'>
					<Col lg='8'>
						<Card className='bg-gradient-default shadow'>
							<CardBody className='p-lg-5 text-white'>
								<h4 className='mb-1 text-white'>Want to work with us?</h4>
								<p className='mt-0 text-white'>
									Your project is very important to us.
								</p>
								<FormGroup
									className={classnames('mt-5', {
										focused: nameFocused,
									})}>
									<InputGroup className='input-group-alternative'>
										<InputGroupAddon addonType='prepend'>
											<InputGroupText>
												<i className='ni ni-user-run' />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder='Your name'
											type='text'
											onFocus={() => {
												setNameFocused(true);
											}}
											onBlur={() => {
												setNameFocused(false);
											}}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup
									className={classnames({
										focused: emailFocused,
									})}>
									<InputGroup className='input-group-alternative'>
										<InputGroupAddon addonType='prepend'>
											<InputGroupText>
												<i className='ni ni-email-83' />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											placeholder='Email address'
											type='email'
											onFocus={() => {
												setEmailFocused(true);
											}}
											onBlur={() => {
												setEmailFocused(false);
											}}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup className='mb-4'>
									<Input
										className='form-control-alternative'
										cols='80'
										name='name'
										placeholder='Type a message...'
										rows='4'
										type='textarea'
									/>
								</FormGroup>
								<div>
									<Button
										block
										className='btn-white shadow text-primary text-bold'
										color='primary'
										size='lg'
										type='button'>
										Send Message
									</Button>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			{/* TODO uncomment when chat support is implemented */}
			{/* <div className='icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary'>
				<i className='ni ni-settings text-primary' />
			</div> */}
		</section>
	);
};

export default Contact;
