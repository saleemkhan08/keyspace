import React from 'react';
import { FormattedDate, FormattedNumber } from 'react-intl';

export const INR = ({ amount }) => (
	<FormattedNumber
		value={amount}
		// eslint-disable-next-line react/style-prop-object
		style='currency'
		currency='INR'
		maximumFractionDigits={0}
		minimumFractionDigits={0}
	/>
);

export const Month = ({ timestamp }) => (
	<FormattedDate value={timestamp} year='numeric' month='long' />
);

export const DateTime = ({ timestamp }) => (
	<FormattedDate
		value={timestamp}
		year='numeric'
		month='long'
		day='2-digit'
		hour='numeric'
		minute='numeric'
	/>
);
