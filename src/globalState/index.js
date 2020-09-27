import auth from './authSlice.js';
import notification from './notificationSlice.js';

import firebase from './firebase.js';
import store from './store.js';

// TODO handle
export * from './authSlice.js';
export * from './notificationSlice.js';
export * from './servicesSlice.js';
export * from './firestoreHooks.js';

export const reducer = {
	auth,
	notification,
};

export default {
	firebase,
	store,
};
