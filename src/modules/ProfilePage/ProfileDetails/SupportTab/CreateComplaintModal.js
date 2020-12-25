import React from 'react';
import { Button, Card, CardBody, CardHeader, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import {
	COMPLAINTS_TYPES,
	STATUS_TYPES_TEXT,
	COMPLAINTS,
} from 'globalState/ComplaintSlice.js';
import FormInput from 'components/FinalForm/Input';
import { isEmpty } from 'components/FinalForm/validators';
import { useCollection, useAuth } from 'globalState/firestoreHooks';
import './styles.scss';

const CreateComplaintModal = ({ isOpen, onToggle }) => {
	const complaintTypeKeys = Object.keys(COMPLAINTS_TYPES);
	const currentUser = useAuth();
	const { addDoc, isLoading } = useCollection({
		collectionPath: COMPLAINTS,
	});

	const onSubmit = async (values) => {
		if (!isLoading) {
			await addDoc({
				...values,
				order: -1 * Date.now(),
				createdOn: Date.now(),
				status: STATUS_TYPES_TEXT.OPEN.key,
				uid: currentUser.uid,
			});
			onToggle();
		}
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
							<FormInput name='title' form={form} labelTxt='Complaint Title' />
							<FormInput
								name='type'
								form={form}
								labelTxt='Complaint Type'
								type='select'
								options={complaintTypeKeys.map((key) => ({
									label: COMPLAINTS_TYPES[key],
									value: key,
								}))}
							/>
							<FormInput
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
									disabled={pristine || submitting || isLoading}>
									Save {isLoading && <Spinner size='sm' />}
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
