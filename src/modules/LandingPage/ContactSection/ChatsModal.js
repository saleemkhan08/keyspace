import React, { useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import {
	useCollection,
	getChatsCollectionPath,
} from 'globalState/firestoreHooks';

const ChatsModal = ({ isOpen, onToggle }) => {
	const uid = 'testUid';
	const chats = useCollection({
		collectionPath: getChatsCollectionPath(uid),
		order: 'priority',
	});

	return (
		<Modal className='modal-dialog-centered' isOpen={isOpen} toggle={onToggle}>
			<div className='modal-header'>
				<button
					aria-label='Close'
					className='close'
					data-dismiss='modal'
					type='button'
					onClick={onToggle}>
					<span aria-hidden={true}>×</span>
				</button>
			</div>
			<div className='modalBody'>Chats will go here</div>
		</Modal>
	);
};

export default ChatsModal;
