import React from 'react';
import { Table } from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from 'i18n/messages.js';
import { INR } from 'i18n/util';

const BreakUpTable = ({ bill }) => {
	const { breakUp, amount } = bill;
	const { formatMessage } = useIntl();
	return (
		<Table className='rent-receipt-card-body-table'>
			<thead>
				<tr className='border-bottom'>
					<th className='rent-receipt-card-list-item bold-font'>
						{formatMessage(messages.category)}
					</th>
					<th className='rent-receipt-card-list-value bold-font'>
						{formatMessage(messages.billAmount)}
					</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(breakUp).map((key, index) => {
					return (
						<tr key={key}>
							<td className='rent-receipt-card-list-item'>
								{messages[key] ? (
									formatMessage(messages[key])
								) : (
									<FormattedMessage id={key} defaultMessage={key} />
								)}
							</td>
							<td className='rent-receipt-card-list-value'>
								<INR amount={breakUp[key]} />
							</td>
						</tr>
					);
				})}
				<tr className='border-top'>
					<th scope='row' className='rent-receipt-card-list-item bold-font'>
						{formatMessage(messages.total)}
					</th>
					<th scope='row' className='rent-receipt-card-list-value bold-font'>
						<INR amount={amount} />
					</th>
				</tr>
			</tbody>
		</Table>
	);
};

export default BreakUpTable;
