import React from 'react';

import { Button, Card, CardBody, CardHeader, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import FormInput from 'components/FinalForm/Input';
import config, { validate } from './PropertiesConfig.js';

import './styles.scss';

const PropertyEditModal = ({
	isOpen,
	onToggle,
	property,
	updateDoc,
	addDoc,
	isLoading,
}) => {
	const onSubmit = async (values, form) => {
		if (!isLoading) {
			if (property) {
				await updateDoc({
					id: property.id,
					doc: {
						...property,
						...values,
					},
				});
			} else {
				await addDoc({
					...values,
					createdOn: Date.now(),
					order: -1 * Date.now(),
				});
			}
			setTimeout(() => {
				form.reset();
				onToggle();
			});
		}
	};

	const { form, handleSubmit, pristine, submitting } = useForm({
		initialValues: { ...property },
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
						<h3>{property ? 'Edit Property' : 'Create New Property'}</h3>
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
								{property ? 'Save' : 'Create'} &nbsp;
								{isLoading && <Spinner size='sm' />}
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</Modal>
	);
};

export default PropertyEditModal;
