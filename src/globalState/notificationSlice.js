import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [],
	},
	reducers: {
		addNotification: (state, { payload }) => {
			state.notifications.push(payload);
		},
		removeNotification: (state) => {
			if (state.notifications.length) state.notifications.shift();
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const NotificationTypeEnum = Object.freeze({
	ERROR: 1,
	INFO: 2,
	SUCCESS: 3,
	WARNING: 4,
});

export const showNotification = ({
	message,
	type = NotificationTypeEnum.ERROR,
	duration = 2000,
}) => (dispatch) => {
	const { addNotification, removeNotification } = notificationSlice.actions;
	dispatch(addNotification({ message, type }));
	setTimeout(() => {
		dispatch(removeNotification());
	}, duration);
};

export const { clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
