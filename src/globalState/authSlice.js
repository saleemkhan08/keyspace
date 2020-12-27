import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase, { firestore, auth } from 'globalState/firebase';

export const UsersTypes = [
	{ role: 'owner', title: 'Owner' },
	{ role: 'tenant', title: 'Tenants' },
	{ role: 'user', title: 'New Users' },
];

export const EmployeeTypes = [
	{ role: 'admin', title: 'Admins' },
	{ role: 'employee', title: 'Employee' },
	{ role: 'associate', title: 'Associates' },
];

export const AllUserTypes = [...EmployeeTypes, ...UsersTypes];

export const loginWithGoole = createAsyncThunk(
	'users/loginWithGoogle',
	async (_, thunkAPI) => {
		try {
			const { user } = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);
			return {
				name: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const USER_COLLECTION = 'users';
export const fetchUserById = createAsyncThunk(
	'users/fetchUserById',
	async (userId, thunkAPI) => {
		try {
			const snapshot = await firestore
				.collection(USER_COLLECTION)
				.doc(userId)
				.get();
			return snapshot.data();
		} catch (error) {
			return thunkAPI.rejectWithValue(`Firestore Error : ${error}`);
		}
	}
);

export const authSlice = createSlice({
	name: 'user',
	initialState: {
		user: {
			currentUser: null,
			loginProgress: false,
			loginErrorMsg: null,
			redirectToProfilePage: false,
		},
		userData: {
			data: null,
			loading: false,
			error: null,
		},
	},
	reducers: {
		logout: (state) => {
			auth.signOut();
			state.user = {
				currentUser: null,
				loginProgress: false,
				loginErrorMsg: null,
			};
		},
		redirectComplete: (state) => {
			state.user = { redirectToProfilePage: false };
		},
	},
	extraReducers: {
		[loginWithGoole.pending]: (state) => {
			state.user.loginProgress = true;
		},
		[loginWithGoole.rejected]: (state, { payload }) => {
			state.user.loginErrorMsg = payload;
			state.user.loginProgress = false;
		},
		[loginWithGoole.fulfilled]: (state, { payload }) => {
			state.user.currentUser = payload;
			state.user.loginProgress = false;
			state.user.redirectToProfilePage = true;
		},

		[fetchUserById.pending]: (state) => {
			state.user.loading = true;
		},
		[fetchUserById.rejected]: (state, { payload }) => {
			state.user.error = payload;
			state.user.loading = false;
		},
		[fetchUserById.fulfilled]: (state, { payload }) => {
			state.user.data = payload;
			state.user.loading = false;
		},
	},
});
export const { logout, redirectComplete } = authSlice.actions;
export default authSlice.reducer;

export const updateRole = 'updateRole';
export const generateBill = 'generateBill';
export const paymentReminder = 'paymentReminder';
export const acknowledgePayment = 'acknowledgePayment';
export const subscriptions = 'subscriptions';
export const flatsAssignment = 'flatsAssignment';
export const payStatement = 'payStatement';
export const propertiesAssignment = 'propertiesAssignment';
export const servicesAssignment = 'servicesAssignment';
export const modulesAccess = 'modulesAccess';

export const COMMON_OPTIONS = [
	{ key: 'updateRole', value: 'Update role' },
	{ key: 'generateBill', value: 'Generate bill' },
	{ key: 'paymentReminder', value: 'Payment Reminder' },
	{
		key: 'acknowledgePayment',
		value: 'Acknowledge payment',
	},
	{ key: 'subscriptions', value: 'Subscriptions' },
];
export const TENANT_OPTIONS = [
	{ key: 'flatsAssignment', value: 'Flats Assignment' },
];
export const OWNER_OPTIONS = [
	{ key: 'payStatement', value: 'Pay Statement' },
	{ key: 'propertiesAssignment', value: 'Properties Assignment' },
];

export const ASSOCIATES_OPTIONS = [
	{ key: 'payStatement', value: 'Pay Statement' },
	{ key: 'servicesAssignment', value: 'Services Assignment' },
];

export const EMPLOYEES_OPTIONS = [
	{ key: 'payStatement', value: 'Pay Statement' },
	{ key: 'modulesAccess', value: 'Module Access' },
];

export const OPTIONS_ROLE_MAP = {
	tenant: TENANT_OPTIONS,
	owner: OWNER_OPTIONS,
	associate: ASSOCIATES_OPTIONS,
	employee: EMPLOYEES_OPTIONS,
};

export const getOptions = (roles) => {
	const options = [...COMMON_OPTIONS];
	for (const role of roles) {
		if (OPTIONS_ROLE_MAP[role]?.length) {
			options.push(...OPTIONS_ROLE_MAP[role]);
		}
	}
	return options;
};
