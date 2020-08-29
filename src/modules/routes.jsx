import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LandingPage from 'modules/landing-page';
import ProfilePage from 'modules/profile-page';
import ServicesPage from 'modules/services-page';
import PropertiesPage from 'modules/properties-page';
import { loginWithGoole, logout } from 'global-state/auth-slice';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/css/custom-fonts.css';

import { useAuth } from 'global-state/firestoreHooks';
import Navbar from 'components/navbar';
import Footer from 'components/footer';

export const ROUTES = {
	INDEX: '/',
	PROFILE: '/profile',
	SERVICES: '/services',
	PROPERTIES: 'properties',
};

const Routes = () => {
	const currentUser = useAuth();
	const dispatch = useDispatch();
	const { loginProgress, loginErrorMsg, redirectToProfilePage } = useSelector(
		(state) => {
			return state.auth.user || {};
		}
	);

	const handleLogin = () => {
		dispatch(loginWithGoole());
	};
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<>
			<BrowserRouter>
				<Navbar
					onLogin={handleLogin}
					onLogout={handleLogout}
					isLoggedIn={!!currentUser}
				/>
				<div>{loginErrorMsg}</div>
				<Switch>
					<Route path={ROUTES.INDEX} exact>
						<LandingPage currentUser={currentUser} />
					</Route>
					<Route path={ROUTES.PROFILE} exact>
						<ProfilePage currentUser={currentUser} />
					</Route>
					<Route path={ROUTES.SERVICES} exact>
						<ServicesPage currentUser={currentUser} />
					</Route>
					<Route path={ROUTES.PROPERTIES} exact>
						<PropertiesPage currentUser={currentUser} />
					</Route>
					<Redirect to={ROUTES.INDEX} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default Routes;
