import React from 'react';
import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoole, logout } from 'global-state/auth-slice';

import { ROUTES } from 'modules/routes';

const LandingPage = () => {
	const dispatch = useDispatch();

	const {
		currentUser,
		loginProgress,
		loginErrorMsg,
		redirectToProfilePage,
	} = useSelector((state) => {
		return state.auth.user || {};
	});

	const handleLogin = () => {
		dispatch(loginWithGoole());
	};
	const handleLogout = () => {
		dispatch(logout());
	};

	console.log('SalredirectToProfilePage : ', {
		currentUser,
		loginProgress,
		loginErrorMsg,
		redirectToProfilePage,
	});

	if (redirectToProfilePage) {
		return <Redirect to={ROUTES.PROFILE} />;
	}

	return (
		<div>
			Landing Page
			<br />
			<br />
			{!currentUser ? (
				<button disabled={loginProgress} onClick={handleLogin}>
					Login
				</button>
			) : (
				<button disabled={loginProgress} onClick={handleLogout}>
					Logout
				</button>
			)}
			<div>{loginErrorMsg}</div>
		</div>
	);
};

export default LandingPage;
