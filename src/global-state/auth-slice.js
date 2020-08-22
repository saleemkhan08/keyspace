import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase, { firestore, auth } from '../firebase';

export const loginWithGoole = createAsyncThunk(
	'users/loginWithGoogle',
	async (_, thunkAPI) => {
		try {
			const { user } = await auth.signInWithPopup(
				new firebase.auth.GoogleAuthProvider()
			);
			console.log('salUser : ', { user });
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
export const authReducer = authSlice.reducer;
