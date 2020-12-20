import React from 'react';
import { Form as FinalForm } from 'react-final-form';

export { Input } from './Input';
export { isEmpty } from './validators';

export default (props) => (
	<FinalForm
		onSubmit={props.onSubmit}
		render={(renderProps) => (
			<form onSubmit={renderProps.handleSubmit}>
				{props.children(renderProps)}
			</form>
		)}
	/>
);
