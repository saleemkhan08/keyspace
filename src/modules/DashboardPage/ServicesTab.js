import React, { useRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { SERVICES_COLLECTION } from 'globalState/servicesSlice';
import { useCollection, useFileStorage } from 'globalState/firestoreHooks';
import ServiceEditModal from './ServiceEditModal';

const UploadPhoto = ({ imagePath, updateDoc, recordData, fileName }) => {
	const { uploading, fileInputChangeHandler } = useFileStorage({
		docPath: imagePath,
		fileName,
		updateCollectionDoc: updateDoc,
		recordData,
	});

	const fileRef = useRef();
	const handleUpdload = () => {
		if (!uploading) fileRef.current.click();
	};

	return (
		<>
			<input
				type='file'
				hidden
				ref={fileRef}
				onChange={fileInputChangeHandler}
			/>
			<span
				className='material-icons service-tab-list-item-action'
				onClick={handleUpdload}>
				add_a_photo
			</span>
		</>
	);
};

const ServicesTab = () => {
	const { collection: services, deleteDoc, updateDoc, addDoc } = useCollection({
		collectionPath: SERVICES_COLLECTION,
		order: 'order',
	});

	const [editModal, setEditModal] = useState(false);
	const [service, setService] = useState(null);

	return (
		<div className='service-tab-container'>
			<div className='service-tab-title-container'>
				<h3 className='service-tab-title'>Services</h3>
				<Button
					className='create-service-button'
					outline
					color='primary'
					size='sm'
					onClick={() => {
						setService(null);
						setEditModal(true);
					}}>
					Create New
				</Button>
			</div>
			<Row className='service-tab-list-container'>
				{services.map((service) => {
					const imagePath = `${SERVICES_COLLECTION}/${service?.id}`;
					return (
						<Col
							xs='12'
							sm='6'
							md='6'
							lg='4'
							key={service.name}
							className='service-tab-list-col-container'>
							<div className='service-tab-list-item-container'>
								<div className='service-tab-list-item-message-container'>
									<h5 className='service-tab-list-item-message'>
										{service.name}
									</h5>
									<span>
										<UploadPhoto
											imagePath={imagePath}
											updateDoc={updateDoc}
											recordData={service}
											fileName={'photoUrl'}
										/>
										<span
											className='material-icons service-tab-list-item-action'
											onClick={() => {
												setService(service);
												setEditModal(true);
											}}>
											edit
										</span>
										<span
											className='material-icons service-tab-list-item-action'
											onClick={() => deleteDoc(service.id)}>
											delete
										</span>
									</span>
								</div>
								<img
									src={service.photoUrl}
									alt=''
									className='service-img mb-2'
								/>
								<div className='service-tab-list-item-info-container'>
									<p className='description mt-3'>
										{service.description ||
											'Argon is a great free UI package based on Bootstrap 4 that includes the most important components and features.'}
									</p>
								</div>
							</div>
						</Col>
					);
				})}
			</Row>
			<ServiceEditModal
				isOpen={editModal}
				onToggle={() => setEditModal(false)}
				service={service}
				updateDoc={updateDoc}
				addDoc={addDoc}
			/>
		</div>
	);
};

export default ServicesTab;
