import React from 'react';
import { useField } from 'react-final-form-hooks';
import {
	FormFeedback,
	FormGroup,
	Input as BootstrapInput,
	Label,
	Row,
	Col,
} from 'reactstrap';
import WeekDays from './WeekDays';
import TimeRange from './TimeRange';

export default ({
	name,
	form,
	label,
	type = 'text',
	options,
	isRow,
	isCheckbox,
	formGroupClass,
	formLabelClass,
	...props
}) => {
	const {
		input,
		meta: { touched, error, submitError },
	} = useField(name, form);

	const isValid = (error && touched) || submitError;
	let inputComponent = (
		<BootstrapInput
			{...input}
			{...props}
			type={type}
			invalid={isValid}
			checked={isCheckbox && input.value}
			id={name}>
			{options?.map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</BootstrapInput>
	);

	if (type === 'weekDays') {
		inputComponent = <WeekDays {...input} {...props} />;
	}
	// if (type === 'timeRange') {
	// 	inputComponent = <TimeRange {...input} {...props} />;
	// }

	if (isCheckbox) {
		return (
			<FormGroup check className={formGroupClass}>
				<Label check for={name}>
					{label}
				</Label>
				{inputComponent}
				<FormFeedback invalid={isValid}>{error}</FormFeedback>
			</FormGroup>
		);
	}
	return (
		<FormGroup className={formGroupClass}>
			{isRow ? (
				<>
					<Row className='m-3'>
						<Col lg='3'>
							<h5>{label}</h5>
						</Col>
						<Col lg='9'>
							{inputComponent}
							<FormFeedback invalid={isValid}>{error}</FormFeedback>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Label for={name}>{label}</Label>
					{inputComponent}
					<FormFeedback invalid={isValid}>{error}</FormFeedback>
				</>
			)}
		</FormGroup>
	);
};
