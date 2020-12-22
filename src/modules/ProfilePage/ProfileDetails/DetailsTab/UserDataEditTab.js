import React, { useState } from 'react';
import { Button } from 'reactstrap';

import FormInput from 'components/FinalForm/Input';
import { isEmpty, isValidDate } from 'components/FinalForm/validators';
import { useForm } from 'react-final-form-hooks';
import { requiredTextDetails } from './UserDataConfig';
import './styles.scss';

const UserDataEditTab = ({ updateDoc, userData }) => {
	const [editMode, setEditMode] = useState(false);

	const onSubmit = (values) => {
		// TODO show loading and await
		if (!editMode) {
			updateDoc({
				...userData,
				...values,
			});
		}
		// TODO hide loading
	};

	const validate = (values) => {
		const errors = {};
		console.log('Sal values : ', values);
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
		console.log('Sal errors : ', errors);
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
						type='submit'
						onClick={() => setEditMode(!editMode)}>
						<span className='material-icons editSaveBtnIcon'>{iconName}</span>
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
