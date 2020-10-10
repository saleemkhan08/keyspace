import { defineMessages } from 'react-intl';

export default defineMessages({
	rentReceiptText: {
		id: 'rentReceiptText',
		defaultMessage:
			'Received a sum of <b>{amount}</b>, from <b>{name}</b> residing at <b>{address}</b>, for the month of <b>{month}</b>.',
	},
	slNo: {
		id: 'slNo',
		defaultMessage: '#',
	},
	category: {
		id: 'category',
		defaultMessage: 'Category',
	},
	billAmount: {
		id: 'billAmount',
		defaultMessage: 'Bill Amount',
	},
	download: {
		id: 'download',
		defaultMessage: 'Download',
	},
	paidOnDate: {
		id: 'paidOnDate',
		defaultMessage: 'Paid On : {DateTime}',
	},
	total: {
		id: 'total',
		defaultMessage: 'Total',
	},
	rent: {
		id: 'rent',
		defaultMessage: 'Rent',
	},
	electricityBill: {
		id: 'electricityBill',
		defaultMessage: 'Electricity Bill',
	},
	waterBill: {
		id: 'waterBill',
		defaultMessage: 'Water Bill',
	},
	maidServiceCharge: {
		id: 'maidServiceCharge',
		defaultMessage: 'Maid Service Charge',
	},
	convenienceFee: {
		id: 'convenienceFee',
		defaultMessage: 'Convenience Fee',
	},
});
