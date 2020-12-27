import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { PROPERTIES_COLLECTION } from 'globalState/propertiesSlice';
import { useCollection, useFileStorage } from 'globalState/firestoreHooks';
import PropertyEditModal from './PropertiesEditModal';
import UploadPhoto from 'modules/Components/UploadPhoto';
import { property as propertyFallbackImg } from 'assets/img/icons';

const PropertiesCard = ({
	property,
	updateDoc,
	setProperty,
	setEditModal,
	deleteDoc,
}) => {
	const imagePath = `${PROPERTIES_COLLECTION}/${property?.id}`;
	const { uploading, fileInputChangeHandler, preview } = useFileStorage({
		docPath: imagePath,
		fileName: 'photoUrl',
		updateCollectionDoc: updateDoc,
		recordData: property,
	});
	const { street, mainRoad, landmark, area, town, district, state, pincode } =
		property || {};
	const address = [
		street,
		mainRoad,
		landmark,
		area,
		town,
		district,
		state,
		pincode,
	]
		.filter((item) => !!item)
		.join(', ');
	return (
		<Col
			xs='12'
			sm='6'
			md='6'
			lg='4'
			key={property?.name}
			className='service-tab-list-col-container'>
			<div className='service-tab-list-item-container'>
				<div className='service-tab-list-item-message-container'>
					<h5 className='service-tab-list-item-message'>
						{[property?.name, `#${property?.buildingNo}`].join(', ')}
					</h5>
					<span>
						<UploadPhoto
							uploading={uploading}
							fileInputChangeHandler={fileInputChangeHandler}
							className='service-tab-list-item-action'
						/>
						<span
							className='material-icons service-tab-list-item-action'
							onClick={() => {
								setProperty(property);
								setEditModal(true);
							}}>
							edit
						</span>
						<span
							className='material-icons service-tab-list-item-action'
							onClick={() => deleteDoc(property?.id)}>
							delete
						</span>
					</span>
				</div>
				<img
					src={preview || property?.photoUrl || propertyFallbackImg}
					alt=''
					className={`service-img mb-2 ${uploading && 'disabled'}`}
				/>
				<div className='service-tab-list-item-info-container'>
					<p className='description mt-3'>{`${address}`}</p>
				</div>
			</div>
		</Col>
	);
};

const PropertiesTab = () => {
	const {
		collection: properties,
		deleteDoc,
		updateDoc,
		addDoc,
	} = useCollection({
		collectionPath: PROPERTIES_COLLECTION,
		order: 'order',
	});

	const [editModal, setEditModal] = useState(false);
	const [property, setProperty] = useState(null);

	return (
		<div className='service-tab-container'>
			<div className='service-tab-title-container'>
				<h3 className='service-tab-title'>Properties</h3>
				<Button
					className='create-service-button'
					outline
					color='primary'
					size='sm'
					onClick={() => {
						setProperty(null);
						setEditModal(true);
					}}>
					Create New
				</Button>
			</div>
			<Row className='service-tab-list-container'>
				{properties.map((propertyLocal) => (
					<PropertiesCard
						property={propertyLocal}
						updateDoc={updateDoc}
						setProperty={setProperty}
						setEditModal={setEditModal}
						deleteDoc={deleteDoc}
					/>
				))}
			</Row>
			<PropertyEditModal
				isOpen={editModal}
				onToggle={() => setEditModal(false)}
				property={property}
				updateDoc={updateDoc}
				addDoc={addDoc}
			/>
		</div>
	);
};

export default PropertiesTab;
