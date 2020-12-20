import React from 'react';
import { useField } from 'react-final-form-hooks';
import {
	FormFeedback,
	FormGroup,
	Input as BootstrapInput,
	Label,
} from 'reactstrap';

export const Input = ({
	name,
	form,
	labelTxt,
	type = 'text',
	options,
	...props
}) => {
	const {
		input,
		meta: { touched, error, submitError },
	} = useField(name, form);

	const isValid = (error && touched) || submitError;
	return (
		<FormGroup>
			<Label for={name}>{labelTxt}</Label>
			<BootstrapInput
				{...input}
				{...props}
				type={type}
				invalid={isValid}
				id={name}>
				{options?.map(({ value, label }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</BootstrapInput>
			<FormFeedback invalid={isValid}>{error}</FormFeedback>
		</FormGroup>
	);
};
