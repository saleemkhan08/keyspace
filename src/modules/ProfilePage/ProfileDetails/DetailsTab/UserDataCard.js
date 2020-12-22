import React, { useRef } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { useFileStorage } from 'globalState/firestoreHooks';
import Image from 'components/Image';
import './styles.scss';

const UserDataCard = ({ data, onClick, updateDoc, userData, docPath }) => {
	const { preview, uploading, error, fileInputChangeHandler } = useFileStorage({
		docPath,
		fileName: data.name,
		updateDoc,
		userData,
	});

	const fileRef = useRef();
	const handleUpdload = () => {
		fileRef.current.click();
	};

	const imgSrc = error ? null : preview || userData[data.name];

	return (
		<Card className='userDataCardContainer mb-4'>
			<CardBody className='userDataCardBody'>
				<div className='user-data-type-image-container'>
					<Image
						className={`user-data-type-image ${uploading && 'uploading'}`}
						id={data.name}
						src={imgSrc}
						alt={data.labelTxt}
						fallbackSrc={data.fallbackImg}
						onClick={onClick}
					/>
				</div>
				<div className='textContainer'>
					<h5 className='text-primary text-uppercase userDataCardTitle'>
						{data.labelTxt}
					</h5>
					<p className='userDataCardDescription'>
						{userData[data.name] ? data.description : data.placeholder}
					</p>
				</div>
				<input
					type='file'
					hidden
					ref={fileRef}
					onChange={fileInputChangeHandler}
				/>
				<Button
					className='userDataCardAction'
					color='primary'
					disabled={uploading}
					onClick={handleUpdload}>
					Upload
				</Button>
			</CardBody>
		</Card>
	);
};
export default UserDataCard;
