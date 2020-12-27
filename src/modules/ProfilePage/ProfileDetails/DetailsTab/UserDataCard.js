import React, { useRef } from 'react';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import { useFileStorage } from 'globalState/firestoreHooks';
import Image from 'components/Image';
import { saveAs } from 'file-saver';
import './styles.scss';

const UserDataCard = ({ data, onClick, updateDoc, userData, docPath }) => {
	const { preview, uploading, error, fileInputChangeHandler } = useFileStorage({
		docPath,
		fileName: data.name,
		updateDoc,
		recordData: userData,
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
						alt={data.label}
						fallbackSrc={data.fallbackImg}
						onClick={onClick}
					/>
				</div>
				<div className='textContainer'>
					<h5 className='text-primary text-uppercase userDataCardTitle'>
						{data.label}
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
				{data.isDownload ? (
					<Button
						className='userDataCardAction'
						color='primary'
						disabled={!userData[data.name]}
						onClick={() => saveAs(userData[data.name])}>
						Download
					</Button>
				) : (
					<Button
						className='userDataCardAction'
						color='primary'
						disabled={uploading}
						onClick={handleUpdload}>
						{uploading ? (
							<>
								Uploading &nbsp; <Spinner size='sm' type='grow' />
							</>
						) : (
							'Upload'
						)}
					</Button>
				)}
			</CardBody>
		</Card>
	);
};
export default UserDataCard;
