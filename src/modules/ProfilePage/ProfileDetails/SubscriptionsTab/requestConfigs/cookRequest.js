/**
 * 1. Male / Female
 * 2. preferred Language
 * 3. North Indian / South Indian
 * 4. Morning time / After noon time
 * 5. Number of people to cook for
 * 6. Need to wash utensils?
 * 7. Number of days per week
 * 8. Budget
 */

import { isEmpty } from 'components/FinalForm/validators';

export const initialValues = {
	gender: 'A',
	language: 'any',
	cuisine: 'any',
	peopleCount: 1,
	morningTime: {
		enable: true,
		start: { hour: 8, min: 0 },
		end: { hour: 10, min: 0 },
	},
	afternoonTime: {
		enable: false,
		start: { hour: 12, min: 0 },
		end: { hour: 14, min: 0 },
	},
	eveningTime: {
		enable: true,
		start: { hour: 18, min: 0 },
		end: { hour: 19, min: 0 },
	},
	needDishWashing: true,
	weekDays: [true, true, true, true, true, false, false],
	budget: 5000,
};

export const config = [
	{
		name: 'gender',
		type: 'select',
		label: 'Preferred Gender',
		options: [
			{ label: 'Male', value: 'M' },
			{ label: 'Female', value: 'F' },
			{ label: 'Any', value: 'A' },
		],
	},
	{
		name: 'language',
		type: 'select',
		label: 'Preferred Language',
		options: [
			{ label: 'Any', value: 'any' },
			{ label: 'English', value: 'eng' },
			{ label: 'Hindi', value: 'hin' },
			{ label: 'Kannada', value: 'kan' },
			{ label: 'Tamil', value: 'tam' },
			{ label: 'Telugu', value: 'tel' },
			{ label: 'Malayalam', value: 'mal' },
		],
	},
	{
		name: 'kidsCount',
		type: 'number',
		label: 'Number of kids to take care of',
	},
	{
		name: 'timeRangeStart',
		type: 'time',
		label: 'Duration Start (HH:mm AM)',
	},
	{
		name: 'timeRangeEnd',
		type: 'time',
		label: 'Duration End (HH:mm PM)',
	},
	{
		name: 'weekDays',
		type: 'weekDays',
		label: 'Week Days',
	},
	{
		name: 'budget',
		type: 'number',
		label: 'Budget (₹)',
	},
];

export const validate = (values) => {
	const { kidsCount, timeRangeStart, timeRangeEnd, budget } = values;
	console.log('SalCount : ', {
		timeRangeStart,
		timeRangeEnd,
	});
	const errors = {};
	if (isEmpty(kidsCount) || kidsCount <= 0) {
		errors.kidsCount = 'Count should be greater than 0';
	}
	if (
		isEmpty(timeRangeStart) ||
		isEmpty(timeRangeEnd) ||
		timeRangeStart < timeRangeEnd
	) {
		errors.timeRangeEnd = 'Starting hour cannot be after ending hour';
	}
	if (isEmpty(budget) || budget <= 0) {
		errors.budget = 'Budget should be greater than 0';
	}
	return errors;
};

export default {
	config,
	initialValues,
	validate,
};
