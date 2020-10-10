import React, { useEffect } from 'react';
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Modal,
	Table,
} from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

import messages from 'i18n/messages.js';
import { Keyspace } from 'components/Icons';
import { Month } from 'i18n/util';

import { DateTime } from 'i18n/util';
import { INR } from 'i18n/util';
import './styles.scss';

const BillDownloadModal = ({ isOpen, onToggle, bill }) => {
	const { id, paidTimestamp, breakUp, amount, month } = bill;
	const { formatMessage } = useIntl();
	const name = 'Saleem Khan';
	const address =
		'#11, 1st Cross, Muneshwara Nagar, Old Mangammana Palya road, Bommanahalli, Bengaluru - 560068';
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				generatePDF();
			}, 500);
		}
	});

	const generatePDF = () => {
		const element = document.getElementById('divToPrint');
		domtoimage.toJpeg(element).then(function (dataUrl) {
			const pdf = new jsPDF('p', 'pt', 'a4');

			const width = pdf.internal.pageSize.getWidth();
			const height = (width / element.clientWidth) * element.clientHeight;

			console.log('SalHeightWidth : ', {
				clientHeight: element.clientHeight,
				clientWidth: element.clientWidth,
			});

			console.log('SalHeightWidth : ', {
				pdfHeight: height,
				pdfWidth: width,
			});

			pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
			pdf.save('download.pdf');
		});
	};
	return (
		<Modal
			className='modal-dialog-centered wide-modal'
			size='lg'
			isOpen={isOpen}
			toggle={onToggle}>
			<div className='modal-body p-0' id='divToPrint'>
				<Card className='bg-secondary border-0'>
					<CardHeader className='bg-white'>
						<div className='rent-receipt-card-header'>
							<span className='nav-brand-icon-and-text-container'>
								<Keyspace />|<span className='nav-brand-key-text'>KEY</span>
								<span className='nav-brand-space-text'>SPACE</span>
							</span>
							<span>
								Invoice # : {id}
								<br />
								Month : <Month timestamp={month} />
								<br />
								{formatMessage(messages.paidOnDate, {
									DateTime: <DateTime timestamp={new Date(paidTimestamp)} />,
								})}
							</span>
						</div>
					</CardHeader>
					<CardBody className='rent-receipt-card-body'>
						<h3>Rent Receipt</h3>
						<p>
							{formatMessage(messages.rentReceiptText, {
								amount: <INR amount={amount} />,
								name,
								address,
								month: <Month timestamp={month} />,
								b: (word) => <span className='bold-font'>{word}</span>,
							})}
						</p>
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
									<th
										scope='row'
										className='rent-receipt-card-list-item bold-font'>
										{formatMessage(messages.total)}
									</th>
									<th
										scope='row'
										className='rent-receipt-card-list-value bold-font'>
										<INR amount={amount} />
									</th>
								</tr>
							</tbody>
						</Table>
					</CardBody>
					<CardFooter className='bg-white'>
						<div className='copyright rent-receipt-card-footer'>
							<span className='bold'>KEY</span>
							{`SPACE © ${new Date().getFullYear()}`} | support@keyspace.com
						</div>
					</CardFooter>
				</Card>
			</div>
		</Modal>
	);
};

export default BillDownloadModal;
