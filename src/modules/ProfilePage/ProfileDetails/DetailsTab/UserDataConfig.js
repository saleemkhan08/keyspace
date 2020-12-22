import { rentalAgreement, idProof, govtAddressProof } from 'assets/img/icons';

export const requiredTextDetails = [
	{
		className: 'user-data-type-text',
		labelTxt: 'Full Name',
		name: 'name',
		type: 'text',
		placeholder: 'Fullname as per GOVT proof',
	},
	{
		labelTxt: 'Date of Birth',
		name: 'dateOfBirth',
		type: 'date',
		placeholder: 'Date of birth as per GOVT proof',
		className: 'user-data-type-date',
	},
	{
		labelTxt: 'Mobile Number',
		name: 'mobileNumber',
		type: 'tel',
		placeholder: 'Your mobile number',
		className: 'user-data-type-number',
	},
	{
		className: 'user-data-type-text-area',
		labelTxt: 'Office / College Address',
		name: 'officialAddress',
		type: 'textarea',
		rows: '2',
		placeholder: 'Your office or college address as per provided proof',
		description:
			'To verify your office or college address for security purpose',
	},
	{
		className: 'user-data-type-text-area',
		labelTxt: 'Permanent Address',
		name: 'permanentAddress',
		type: 'textarea',
		rows: '2',
		placeholder: 'Your premanent address here as per GOVT proof',
		description: 'To verify your permanent address for security purpose',
	},
];

export const requiredImageDetails = [
	{
		labelTxt: 'Government Address proof',
		name: 'govtAddrproof',
		placeholder: 'Please upload your government address proof',
		description: 'To verify your address for security purpose',
		fallbackImg: govtAddressProof,
	},
	{
		labelTxt: 'Office / College ID proof',
		name: 'officeCollegeProof',
		placeholder: 'Please upload your Office or College ID proof',
		description: 'To validate that you have a stable income to pay the rent',
		fallbackImg: idProof,
	},
	{
		name: 'rentalAgreement',
		labelTxt: 'Rental Agreement',
		fallbackImg: rentalAgreement,
		description: 'Rental Agreement can be downloaded from here.',
		placeholder:
			'Your rental agreement will appear here, when all the details are verified.',
	},
];
