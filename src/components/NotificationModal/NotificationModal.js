import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'reactstrap';
import {
	clearNotifications,
	NotificationTypeEnum,
} from 'globalState/notificationSlice';

const getContentClassName = (notifications) => {
	if (notifications?.length) {
		switch (notifications[0].type) {
			case NotificationTypeEnum.INFO:
				return 'bg-gradient-info';
			case NotificationTypeEnum.SUCCESS:
				return 'bg-gradient-success';
			case NotificationTypeEnum.WARNING:
				return 'bg-gradient-warning';
			case NotificationTypeEnum.ERROR:
			default:
				return 'bg-gradient-error';
		}
	}
	return 'bg-gradient-info';
};

const NotificationModal = () => {
	const dispatch = useDispatch();
	const { notifications } = useSelector((state) => {
		return state.notification;
	});
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(!!notifications?.length);
	}, [notifications]);

	const contentClassName = getContentClassName(notifications);
	return (
		<Modal
			className='modal-dialog-centered modal-danger'
			contentClassName={contentClassName}
			isOpen={isOpen}
			toggle={() => dispatch(clearNotifications())}>
			<div className='modal-header'>
				<button
					aria-label='Close'
					className='close'
					data-dismiss='modal'
					type='button'
					onClick={() => dispatch(clearNotifications())}>
					<span aria-hidden={true}>×</span>
				</button>
			</div>
			<div className='modalBody'>
				<div className='py-1 text-center'>
					<i className='ni ni-bell-55 ni-3x' />
					{notifications?.map((notification) => {
						return <h4 className='heading m-4'>{notification?.message}</h4>;
					})}
				</div>
			</div>
		</Modal>
	);
};

export default NotificationModal;
