import { isEmpty } from 'components/FinalForm/validators';

export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Service Name',
	},
	{
		name: 'description',
		type: 'textarea',
		rows: '2',
		placeholder: 'Description',
	},
	{
		name: 'order',
		type: 'number',
		placeholder: 'Display Order',
	},
];

export const validate = (values) => {
	const errors = {};
	if (isEmpty(values.name)) {
		errors.name = 'Please enter service Name';
	}
	if (isEmpty(values.order)) {
		errors.order = 'Please enter the display order';
	}
	if (isEmpty(values.description)) {
		errors.description = 'Please enter the description';
	}
	return errors;
};
