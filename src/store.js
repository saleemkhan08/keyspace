import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'global-state/auth-slice';

export default configureStore({
	reducer: {
		auth: authReducer,
	},
});
