import React, { useState } from 'react';
import { Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import ImgsViewer from 'react-images-viewer';

import Image from 'components/Image';
import { rentalAgreement, idProof, govtAddressProof } from 'assets/img/icons';
import UserDataCard from './UserDataCard';
import './styles.scss';

// TODO object.freeze
const USER_DATA_TYPES = {
	TEXT_AREA: 'textArea',
	IMAGE: 'image',
	TEXT: 'text',
	NUMBER: 'number',
	DATE: 'date',
};

const AddressTab = () => {
	const [currentImage, setCurrentImage] = useState({ index: 0, isOpen: false });
	const userDetails = {
		// govtAddrproof:
		// 	'https://bankbazaarnews.com/wp-content/uploads/2017/07/Aadhar-Card.jpg',
		// rentalAgreement:
		// 	'https://i.pinimg.com/originals/23/b9/84/23b9842afa25d0912cff7ece74e49091.jpg',
		// idProof:
		// 	'https://i.pinimg.com/originals/23/b9/84/23b9842afa25d0912cff7ece74e49091.jpg',
	};

	const detailsToBeShown = [
		{
			title: 'Full Name',
			key: 'fullName',
			type: USER_DATA_TYPES.TEXT,
			placeholder: 'Fullname as per GOVT proof',
		},
		{
			title: 'Date of Birth',
			key: 'dateOfBirth',
			type: USER_DATA_TYPES.DATE,
			placeholder: 'Date of birth as per GOVT proof',
		},
		{
			title: 'Mobile Number',
			key: 'mobile Number',
			type: USER_DATA_TYPES.NUMBER,
			placeholder: 'Your mobile number',
		},
		{
			title: 'Office / College Address',
			key: 'officeCollegeAddress',
			type: USER_DATA_TYPES.TEXT_AREA,
			placeholder: 'Your office or college address as per provided proof',
			description:
				'To verify your office or college address for security purpose',
		},
		{
			title: 'Permanent Address',
			key: 'permanentAddress',
			type: USER_DATA_TYPES.TEXT_AREA,
			placeholder: 'Your premanent address here as per GOVT proof',
			description: 'To verify your permanent address for security purpose',
		},
		{
			title: 'Government Address proof',
			key: 'govtAddrproof',
			type: USER_DATA_TYPES.IMAGE,
			placeholder: 'Please upload your government address proof',
			description: 'To verify your address for security purpose',
			fallbackImg: govtAddressProof,
		},
		{
			title: 'Office / College ID proof',
			key: 'officeCollegeProof',
			type: USER_DATA_TYPES.IMAGE,
			placeholder: 'Please upload your Office or College ID proof',
			description: 'To validate that you have a stable income to pay the rent',
			fallbackImg: idProof,
		},
		{
			key: 'rentalAgreement',
			title: 'Rental Agreement',
			type: USER_DATA_TYPES.IMAGE,
			fallbackImg: rentalAgreement,
			description: 'Rental Agreement can be downloaded from here.',
			placeholder:
				'Your rental agreement will appear here, when all the details are verified.',
		},
	];
	const getInfoComponent = (data) => {
		switch (data.type) {
			case USER_DATA_TYPES.TEXT:
				return (
					<Input
						className='user-data-type-text'
						placeholder={data.placeholder}
						value={userDetails[data.key]}
						type='text'
					/>
				);
			case USER_DATA_TYPES.NUMBER:
				return (
					<Input
						className='user-data-type-number'
						placeholder={data.placeholder}
						value={userDetails[data.key]}
						type='tel'
						pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
					/>
				);
			case USER_DATA_TYPES.DATE:
				return (
					<Input
						className='user-data-type-date'
						placeholder={data.placeholder}
						value={userDetails[data.key]}
						type='date'
					/>
				);
			case USER_DATA_TYPES.TEXT_AREA:
				return (
					<Input
						className='user-data-type-text-area'
						placeholder={data.placeholder}
						rows='2'
						value={userDetails[data.key]}
						type='textarea'
					/>
				);
			case USER_DATA_TYPES.IMAGE: {
				if (userDetails[data.key]) {
					return (
						<>
							<Image
								className='user-data-type-image'
								id={data.key}
								src={userDetails[data.key]}
								alt={data.title}
								fallbackSrc={data.fallbackImg}
							/>
							<UncontrolledTooltip placement='top' target={data.key}>
								{data.description}
							</UncontrolledTooltip>
						</>
					);
				} else {
					return (
						<div className='user-data-placeholder-text'>{data.placeholder}</div>
					);
				}
			}

			default:
				return null;
		}
	};
	const imagesData = detailsToBeShown.filter(
		(data) => data.type === USER_DATA_TYPES.IMAGE
	);
	const showImgViewer = (isShow, index = 0) => {
		setCurrentImage({ isOpen: isShow, index });
	};
	const showNextImage = () => {
		setCurrentImage({ index: currentImage.index + 1, isOpen: true });
	};
	const showPrevImg = () => {
		setCurrentImage({ index: currentImage.index - 1, isOpen: true });
	};
	return (
		<div className='address-container'>
			{detailsToBeShown
				.filter((data) => data.type !== USER_DATA_TYPES.IMAGE)
				.map((data) => {
					return (
						<Row key={data.key} className='m-3'>
							<Col lg='3'>
								<h5>{data.title}</h5>
							</Col>
							<Col lg='9'>{getInfoComponent(data)}</Col>
						</Row>
					);
				})}

			<Row className='m-3'>
				{imagesData.map((data, index) => (
					<Col lg='4' md='6' sm='6' xs='12'>
						<UserDataCard
							key={data.key}
							data={data}
							userDetails={userDetails}
							onClick={() => showImgViewer(true, index)}
						/>
					</Col>
				))}
				<ImgsViewer
					closeBtnTitle='Close'
					leftArrowTitle='Previous Image'
					rightArrowTitle='Next Image'
					imgs={imagesData.map((data) => ({
						src: userDetails[data.key] || data.fallbackImg,
						caption: `${data.title} : ${
							userDetails[data.key] ? data.description : data.placeholder
						}`,
					}))}
					currImg={currentImage.index}
					isOpen={currentImage.isOpen}
					onClickPrev={showPrevImg}
					onClickNext={showNextImage}
					onClose={() => showImgViewer(false)}
				/>
			</Row>
		</div>
	);
};

export default AddressTab;
