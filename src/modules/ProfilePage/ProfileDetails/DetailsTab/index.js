import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import ImgsViewer from 'react-images-viewer';

import UserDataCard from './UserDataCard';

import UserDataEditTab from './UserDataEditTab';
import { requiredImageDetails } from './UserDataConfig';
import { useDocument, useAuth } from 'globalState/firestoreHooks';
import { USER_COLLECTION } from 'globalState/authSlice';

const DetailsTab = () => {
	const [currentImage, setCurrentImage] = useState({ index: 0, isOpen: false });
	const currentUser = useAuth();
	const docPath = `${USER_COLLECTION}/${currentUser?.uid}`;
	const { data: userData, updateDoc, isLoading } = useDocument(docPath);

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
		<div>
			<UserDataEditTab
				updateDoc={updateDoc}
				userData={userData}
				isLoading={isLoading}
			/>
			<Row className='m-3'>
				{requiredImageDetails.map((data, index) => (
					<Col lg='4' md='6' sm='6' xs='12'>
						<UserDataCard
							key={data.key}
							data={data}
							userDetails={{}}
							onClick={() => showImgViewer(true, index)}
							updateDoc={updateDoc}
							userData={userData}
							docPath={docPath}
						/>
					</Col>
				))}
				<ImgsViewer
					closeBtnTitle='Close'
					leftArrowTitle='Previous Image'
					rightArrowTitle='Next Image'
					imgs={requiredImageDetails.map((data) => ({
						src: data.fallbackImg,
						caption: `${data.label} : ${data.description}`,
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

export default DetailsTab;
