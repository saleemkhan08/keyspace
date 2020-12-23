import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LandingPage from 'modules/LandingPage';
import ProfilePage from 'modules/ProfilePage';
import DashboardPage from 'modules/DashboardPage';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import NotificationModal from 'components/NotificationModal';

import { loginWithGoole } from 'globalState/authSlice';
import { useAuth } from 'globalState/firestoreHooks';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/css/custom-fonts.css';

export const ROUTES = {
	INDEX: '/',
	PROFILE: '/profile',
	DASHBOARD: '/dashboard',
	ABOUT: '#about',
	CONTACT: '#contact',
};

const Routes = () => {
	const currentUser = useAuth();
	const [currentPosition, setCurrentPosition] = useState(null);
	const dispatch = useDispatch();
	const handleLogin = () => {
		dispatch(loginWithGoole());
	};

	return (
		<>
			<BrowserRouter>
				<Navbar
					onLogin={handleLogin}
					currentUser={currentUser}
					onNavigate={setCurrentPosition}
				/>
				<Switch>
					<Route path={ROUTES.INDEX} exact>
						<LandingPage
							currentUser={currentUser}
							currentPosition={currentPosition}
						/>
					</Route>
					{currentUser && (
						<>
							<Route path={ROUTES.PROFILE} exact>
								<ProfilePage
									currentUser={currentUser}
									currentPosition={currentPosition}
								/>
							</Route>
							<Route path={ROUTES.DASHBOARD} exact>
								<DashboardPage
									currentUser={currentUser}
									currentPosition={currentPosition}
								/>
							</Route>
						</>
					)}
					<Redirect to={ROUTES.INDEX} />
				</Switch>
				<NotificationModal />
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default Routes;
