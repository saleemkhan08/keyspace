import React, { useRef, useEffect } from 'react';
import {
	showNotification,
	NotificationTypeEnum,
} from 'globalState/notificationSlice';

import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	Spinner,
} from 'reactstrap';
import { ROUTES } from 'modules/routes';
import { useForm } from 'react-final-form-hooks';
import FormInput from 'components/FinalForm/Input';
import { useCollection } from 'globalState/firestoreHooks';
import config, { validate } from './ContactFormConfig';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { ENQURIES } from 'globalState/EnquiriesSlice';

const ContactSection = ({ currentPosition }) => {
	const dispatch = useDispatch();
	const { addDoc, isLoading } = useCollection({
		collectionPath: ENQURIES,
	});

	const onSubmit = async (values, form) => {
		if (!isLoading) {
			await addDoc({
				...values,
				order: -1 * Date.now(),
				createdOn: Date.now(),
			});

			dispatch(
				showNotification({
					message: 'Message Sent',
					type: NotificationTypeEnum.SUCCESS,
				})
			);
			setTimeout(() => {
				form.reset();
				form.resetFieldState('name');
				form.resetFieldState('email');
				form.resetFieldState('mobileNumber');
				form.resetFieldState('enquiry');
			});
		}
	};

	const { form, handleSubmit, pristine, submitting } = useForm({
		initialValues: {},
		onSubmit,
		validate,
	});

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
								<h4 className='mb-1 text-white'>Have any enquiries?</h4>
								<p className='mt-0 text-white'>
									Write to us and we'll get back to you as soon as we can...
								</p>
								<form onSubmit={handleSubmit}>
									{config.map((detail) => (
										<FormInput
											{...detail}
											form={form}
											formGroupClass='contact-form-input-group'
										/>
									))}
									<Button
										block
										className='btn-white shadow text-primary text-bold mt-4'
										color='primary'
										size='lg'
										disabled={pristine || submitting || isLoading}
										type='submit'>
										Send Message &nbsp;
										{isLoading && <Spinner size='sm' />}
									</Button>
								</form>
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

export default ContactSection;
