import React from 'react';

import { Button, Card, CardBody, CardHeader, Modal, Spinner } from 'reactstrap';
import { useForm } from 'react-final-form-hooks';
import FormInput from 'components/FinalForm/Input';

const FormModal = ({
	initialValues,
	isLoading,
	isOpen,
	onSubmit,
	onToggle,
	title,
	config,
	validate,
}) => {
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
					<CardHeader className='bg-white form-modal-card-header'>
						<h3>{title}</h3>
					</CardHeader>
					<CardBody className='px-lg-4 py-lg-4'>
						<form onSubmit={handleSubmit}>
							{config.map((detail) => (
								<FormInput
									{...detail}
									form={form}
									formGroupClass='form-modal-input-group'
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

export default FormModal;
