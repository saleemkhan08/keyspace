import React from 'react';

import { Button, Card, CardBody, CardHeader, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import FormInput from 'components/FinalForm/Input';
import { AllUserTypes } from 'globalState/authSlice';

const UpdateRoles = ({ isOpen, onToggle, userData, updateDoc, isLoading }) => {
	const onSubmit = async (values) => {
		if (!isLoading) {
			if (userData) {
				await updateDoc({
					id: userData.uid,
					doc: {
						...userData,
						roles: Object.keys(values).filter((key) => values[key]),
					},
				});
			}
			onToggle();
		}
	};

	const initialValues = {};
	for (const role of userData?.roles || []) {
		initialValues[role] = true;
	}

	const validate = (values) => {
		if (!Object.keys(values).filter((key) => values[key])?.length) {
			return { user: 'Please select at least one' };
		}
		return {};
	};

	const { form, handleSubmit, pristine, submitting } = useForm({
		initialValues,
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
						<h3>Update Roles</h3>
					</CardHeader>
					<CardBody className='px-lg-4 py-lg-4'>
						<form onSubmit={handleSubmit}>
							{AllUserTypes.map((userType) => ({
								label: userType.title,
								name: userType.role,
								type: 'checkbox',
								value: userType.role,
							})).map((detail) => (
								<FormInput
									{...detail}
									form={form}
									formGroupClass='contact-form-input-group'
									isCheckbox
								/>
							))}
							<Button
								block
								className='btn-white shadow text-primary text-bold mt-4'
								color='primary'
								size='lg'
								disabled={pristine || submitting || isLoading}
								type='submit'>
								Save
								{isLoading && (
									<>
										&nbsp;
										<Spinner size='sm' />
									</>
								)}
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</Modal>
	);
};

export default UpdateRoles;
