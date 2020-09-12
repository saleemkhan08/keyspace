import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LandingPage from 'modules/landing-page';
import { loginWithGoole } from 'global-state/auth-slice';

import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/font-awesome/css/font-awesome.min.css';
import 'assets/scss/argon-design-system-react.scss?v1.1.0';
import 'assets/css/custom-fonts.css';

import { useAuth } from 'global-state/firestoreHooks';
import Navbar from 'components/navbar';
import Footer from 'components/footer';
import NotificationModal from 'components/notification/NotificationModal';

export const ROUTES = {
	INDEX: '/',
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
					<Redirect to={ROUTES.INDEX} />
				</Switch>
				<NotificationModal />
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default Routes;
