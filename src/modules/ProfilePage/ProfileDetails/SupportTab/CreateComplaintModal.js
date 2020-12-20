import React from 'react';
import { Button, Card, CardBody, CardHeader, Modal } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import { COMPLAINTS_TYPES } from './SupportTab';
import { isEmpty, Input } from 'components/FinalForm';
import { useCollection } from 'globalState';
import { STATUS_TYPES_TEXT, COMPLAINTS } from './SupportTab.js';
import './styles.scss';

const CreateComplaintModal = ({ isOpen, onToggle }) => {
	const complaintTypeKeys = Object.keys(COMPLAINTS_TYPES);
	const { addDoc } = useCollection({
		collectionPath: COMPLAINTS,
	});

	const onSubmit = (values) => {
		// TODO show loading and await
		addDoc({
			...values,
			order: -1 * Date.now(),
			createdOn: Date.now(),
			status: STATUS_TYPES_TEXT.OPEN.key,
		});
		// TODO hide loading
		onToggle();
	};

	const validate = (values) => {
		const errors = {};
		if (isEmpty(values.title)) {
			errors.title = 'Please enter the title';
		}
		if (isEmpty(values.description)) {
			errors.description = 'Please enter description';
		}
		if (!complaintTypeKeys.includes(values.type)) {
			errors.type = 'Please select a valid complaint type';
		}
		return errors;
	};

	const { form, handleSubmit, pristine, submitting } = useForm({
		initialValues: { type: 'PLUMBING' },
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
						<h3>Raise New Complaint</h3>
					</CardHeader>
					<CardBody className='px-lg-4 py-lg-4'>
						<form onSubmit={handleSubmit}>
							<Input name='title' form={form} labelTxt='Complaint Title' />
							<Input
								name='type'
								form={form}
								labelTxt='Complaint Type'
								type='select'
								options={complaintTypeKeys.map((key) => ({
									label: COMPLAINTS_TYPES[key],
									value: key,
								}))}
							/>
							<Input
								name='description'
								form={form}
								labelTxt='Description'
								type='textarea'
							/>
							<div className='text-center'>
								<Button
									className='mt-3'
									color='primary'
									type='submit'
									disabled={pristine || submitting}>
									Save
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
			</div>
		</Modal>
	);
};

export default CreateComplaintModal;
