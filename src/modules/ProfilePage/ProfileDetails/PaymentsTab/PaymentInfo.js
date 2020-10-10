import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Collapse, Table } from 'reactstrap';

import { DateTime, Month, INR } from 'i18n/util';
import messages from 'i18n/messages.js';
import './styles.scss';
import BillDownloadModal from './BillDownloadModal';

const PaymentInfo = ({ bill }) => {
	const { id, paidTimestamp, breakUp, amount } = bill;
	const [showMoreInfo, setShowMoreInfo] = useState(false);
	const { formatMessage } = useIntl();
	const [showBill, setShowBill] = useState(false);
	return (
		<div key={id} className='payments-tab-list-item-container'>
			<h5 className='payments-tab-list-item-title'>
				<span className='payments-tab-list-item-right-container'>
					<Month timestamp={paidTimestamp} />
					<Button
						onClick={() => setShowBill(true)}
						outline
						size='sm'
						className='ml-2'
						color='success'>
						{formatMessage(messages.download)}
					</Button>
				</span>
				<span className='payments-tab-list-item-right-container'>
					<INR amount={amount} />
					<Button
						outline
						size='sm'
						className='ml-1'
						color='default'
						onClick={() => {
							setShowMoreInfo(!showMoreInfo);
						}}>
						<span
							className={`fa ${
								showMoreInfo ? 'fa-chevron-up' : 'fa-chevron-down'
							}`}
						/>
					</Button>
				</span>
			</h5>
			<div className='payments-tab-list-item-sub-title-container'>
				<p className='payments-tab-list-item-created-on'>
					{formatMessage(messages.paidOnDate, {
						DateTime: <DateTime timestamp={new Date(paidTimestamp)} />,
					})}
				</p>

				<BillDownloadModal
					bill={bill}
					isOpen={showBill}
					onToggle={() => setShowBill(false)}
				/>
			</div>
			<Collapse isOpen={showMoreInfo}>
				<Table>
					<thead>
						<tr>
							<th>{formatMessage(messages.slNo)}</th>
							<th>{formatMessage(messages.category)}</th>
							<th>{formatMessage(messages.billAmount)}</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(breakUp).map((key, index) => {
							return (
								<tr key={key}>
									<th scope='row'>{index + 1}</th>
									<td>
										{messages[key] ? (
											formatMessage(messages[key])
										) : (
											<FormattedMessage id={key} defaultMessage={key} />
										)}
									</td>
									<td>
										<INR amount={breakUp[key]} />
									</td>
								</tr>
							);
						})}
						<tr>
							<th scope='row' colSpan={2}>
								<strong>{formatMessage(messages.total)}</strong>
							</th>
							<th scope='row'>
								<INR amount={amount} />
							</th>
						</tr>
					</tbody>
				</Table>
			</Collapse>
		</div>
	);
};

export default PaymentInfo;
