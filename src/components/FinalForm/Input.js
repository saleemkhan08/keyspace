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

export default ({
	name,
	form,
	labelTxt,
	type = 'text',
	options,
	isRow,
	...props
}) => {
	const {
		input,
		meta: { touched, error, submitError },
	} = useField(name, form);

	const isValid = (error && touched) || submitError;
	const inputComponent = (
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
	);
	return (
		<FormGroup>
			{isRow ? (
				<>
					<Row className='m-3'>
						<Col lg='3'>
							<h5>{labelTxt}</h5>
						</Col>
						<Col lg='9'>
							{inputComponent}
							<FormFeedback invalid={isValid}>{error}</FormFeedback>
						</Col>
					</Row>
				</>
			) : (
				<>
					<Label for={name}>{labelTxt}</Label>
					{inputComponent}
					<FormFeedback invalid={isValid}>{error}</FormFeedback>
				</>
			)}
		</FormGroup>
	);
};
