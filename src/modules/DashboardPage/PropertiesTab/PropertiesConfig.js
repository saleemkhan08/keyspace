import { isEmpty } from 'components/FinalForm/validators';

export default [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Property Name',
	},
	{
		name: 'buildingNo',
		type: 'text',
		placeholder: 'Building No.',
	},
	{
		name: 'street',
		type: 'text',
		placeholder: 'Street/Lane/Cross',
	},
	{
		name: 'mainRoad',
		type: 'text',
		placeholder: 'Main Road',
	},
	{
		name: 'landmark',
		type: 'text',
		placeholder: 'Landmark',
	},
	{
		name: 'area',
		type: 'text',
		placeholder: 'Area',
	},
	{
		name: 'town',
		type: 'text',
		placeholder: 'Town/Taluk',
	},
	{
		name: 'district',
		type: 'text',
		placeholder: 'City/District',
	},
	{
		name: 'state',
		type: 'text',
		placeholder: 'State',
	},
	{
		name: 'pincode',
		type: 'text',
		placeholder: 'Pincode',
	},
	// Geo Location
	// Owner
	// flats
];

export const validate = (values) => {
	const errors = {};
	if (isEmpty(values.name) && isEmpty(values.buildingNo)) {
		errors.name = 'Please enter Building Name or Number';
	}
	if (
		isEmpty(values.street) &&
		isEmpty(values.mainRoad) &&
		isEmpty(values.landmark)
	) {
		errors.street = 'Please enter Street/Lane/Cross or Main Road or Landmark';
	}
	if (isEmpty(values.area) && isEmpty(values.town)) {
		errors.area = 'Please enter Area or Town/Taluk';
	}
	if (isEmpty(values.district)) {
		errors.district = 'Please enter the District';
	}
	if (isEmpty(values.state)) {
		errors.state = 'Please enter the state';
	}
	if (isEmpty(values.pincode)) {
		errors.pincode = 'Please enter the pincode';
	}
	return errors;
};
