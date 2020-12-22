import React, { useState } from 'react';
import { Button, Spinner } from 'reactstrap';

import FormInput from 'components/FinalForm/Input';
import { isEmpty, isValidDate } from 'components/FinalForm/validators';
import { useForm } from 'react-final-form-hooks';
import { requiredTextDetails } from './UserDataConfig';
import './styles.scss';

const UserDataEditTab = ({ updateDoc, userData, isLoading }) => {
	const [editMode, setEditMode] = useState(false);

	const onSubmit = async (values) => {
		if (!isLoading && !editMode) {
			updateDoc({
				...userData,
				...values,
			});
		}
	};

	const validate = (values) => {
		const errors = {};
		if (isEmpty(values.name)) {
			errors.name = 'Please enter a valid name';
		}
		if (isValidDate(values.dateOfBirth)) {
			errors.dateOfBirth = 'Please enter a valid date';
		}
		if (isEmpty(values.mobileNumber)) {
			errors.mobileNumber = 'Please enter a valid mobile number';
		}
		if (isEmpty(values.officialAddress)) {
			errors.officialAddress = 'Please enter a valid official address';
		}
		if (isEmpty(values.permanentAddress)) {
			errors.permanentAddress = 'Please enter a valid permanent address';
		}
		return errors;
	};

	const { form, handleSubmit, submitting } = useForm({
		initialValues: { ...userData },
		onSubmit,
		validate,
	});
	const [iconName, inputClass] = editMode
		? ['save', 'allowEdit']
		: ['create', 'disallowEdit'];
	return (
		<div className='details-editor-container'>
			<form onSubmit={handleSubmit}>
				<div className='editSaveBtn'>
					<Button
						outline
						size='sm'
						color='success'
						disabled={isLoading}
						type='submit'
						onClick={() => setEditMode(!editMode)}>
						{isLoading ? (
							<Spinner size='sm' type='grow' />
						) : (
							<span className='material-icons editSaveBtnIcon'>{iconName}</span>
						)}
					</Button>
				</div>
				{requiredTextDetails.map((detail) => (
					<FormInput
						{...detail}
						form={form}
						isRow
						className={inputClass}
						disabled={!editMode || submitting}
					/>
				))}
			</form>
		</div>
	);
};

export default UserDataEditTab;
