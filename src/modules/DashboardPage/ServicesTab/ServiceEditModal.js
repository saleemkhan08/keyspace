import React from 'react';

import { Button, Card, CardBody, CardHeader, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import FormInput from 'components/FinalForm/Input';
import config, { validate } from './ServiceConfig.js';

import './styles.scss';

const ServiceEditModal = ({
	isOpen,
	onToggle,
	service,
	updateDoc,
	addDoc,
	isLoading,
}) => {
	const onSubmit = async (values, form) => {
		if (!isLoading) {
			if (service) {
				await updateDoc({
					id: service.id,
					doc: {
						...service,
						...values,
					},
				});
			} else {
				await addDoc({
					...values,
					createdOn: Date.now(),
				});
			}
			setTimeout(() => {
				form.reset();
				form.resetFieldState('name');
				form.resetFieldState('description');
				onToggle();
			});
		}
	};

	const { form, handleSubmit, pristine, submitting } = useForm({
		initialValues: { ...service },
		onSubmit,
		validate,
	});

	return (
		<Modal
			className='modal-dialog-centered'
			size='sm'
			isOpen={isOpen}
			toggle={onToggle}>
			<div className='modal-body p-0'>
				<Card className='bg-secondary shadow border-0'>
					<CardHeader className='bg-white create-new-complaint-card-header'>
						<h3>{service ? 'Edit Service' : 'Create New Service'}</h3>
					</CardHeader>
					<CardBody className='px-lg-4 py-lg-4'>
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
								{service ? 'Save' : 'Create'} &nbsp;
								{isLoading && <Spinner size='sm' />}
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</Modal>
	);
};

export default ServiceEditModal;
