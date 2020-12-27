import { isEmpty } from 'components/FinalForm/validators';

/*
    updateRole
	generateBill
	paymentReminder
	acknowledgePayment
	subscriptions
	flatsAssignment
	payStatement
	propertiesAssignment
	servicesAssignment
	modulesAccess
*/
export const updateRoleConfig = [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Your fullname',
	},
	{
		name: 'email',
		type: 'email',
		placeholder: 'Email address',
	},
	{
		name: 'mobileNumber',
		type: 'tel',
		placeholder: 'Your mobile number',
	},
	{
		name: 'enquiry',
		type: 'textarea',
		rows: '2',
		placeholder: 'Your enquiry',
	},
];

export const validate = (values) => {
	const errors = {};
	if (isEmpty(values.name)) {
		errors.title = 'Please enter your fullname';
	}
	if (isEmpty(values.email) && isEmpty(values.mobileNumber)) {
		errors.email = 'Please enter your email or mobile number';
	}
	if (isEmpty(values.enquiry)) {
		errors.enquiry = 'Please enter your enquiry';
	}
	return errors;
};
