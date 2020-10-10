import React, { useState } from 'react';

import { Month } from 'i18n/util';
import PaymentInfo from './PaymentInfo';
import TermsNConditions from './TermsNConditions';

import './styles.scss';

const listOfBillsPaid = [
	{
		id: 1001,
		month: Date.parse('06-01-2020 00:00'),
		paidTimestamp: Date.parse('07-23-2020 08:30'),
		amount: 25200,
		breakUp: {
			Rent: 18000,
			'Electricity Bill': 1200,
			'Water Bill': 800,
			'Maid Service Charge': 5000,
			'Convenience Fee': 200,
		},
	},
	{
		id: 1002,
		month: Date.parse('07-01-2020 00:00'),
		paidTimestamp: Date.parse('08-23-2020 08:30'),
		amount: 25200,
		breakUp: {
			Rent: 18000,
			'Electricity Bill': 1200,
			'Water Bill': 800,
			'Maid Service Charge': 5000,
			'Convenience Fee': 200,
		},
	},
	{
		id: 1003,
		month: Date.parse('08-01-2020 00:00'),
		paidTimestamp: Date.parse('09-23-2020 08:30'),
		amount: 25200,
		breakUp: {
			Rent: 18000,
			'Electricity Bill': 1200,
			'Water Bill': 800,
			'Maid Service Charge': 5000,
			'Convenience Fee': 200,
		},
	},
];

const Payments = () => {
	const [showTermsNConditions, setShowTermsNConditions] = useState(false);
	return (
		<div>
			<div className='payments-tab-container'>
				<div className='payments-tab-title-container'>
					<h3>
						<Month timestamp={Date.now()} />
						<span
							className='fa fa-info payments-info-icon'
							id='payments-info'
							onClick={() => setShowTermsNConditions(true)}
						/>
						<TermsNConditions
							isOpen={showTermsNConditions}
							onToggle={() => setShowTermsNConditions(false)}
						/>
					</h3>
				</div>
				<PaymentInfo bill={listOfBillsPaid[0]} />
				<div className='payments-tab-list-container'>
					{listOfBillsPaid
						.sort((bill1, bill2) => bill2.paidTimestamp - bill1.paidTimestamp)
						.map((bill) => (
							<PaymentInfo bill={bill} key={bill.id} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Payments;
