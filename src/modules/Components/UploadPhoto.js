import React, { useRef } from 'react';

const UploadPhoto = ({ uploading, fileInputChangeHandler, className }) => {
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
				className={`material-icons ${className} ${uploading && 'disabled'}`}
				onClick={handleUpdload}>
				add_a_photo
			</span>
		</>
	);
};

export default UploadPhoto;
