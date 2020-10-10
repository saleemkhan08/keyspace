import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import I18nProvider from 'i18n/provider';
import LOCALES from 'i18n/locales';
import store from 'globalState/store';
import Routes from 'modules/routes.js';

ReactDOM.render(
	<Provider store={store}>
		<I18nProvider locale={LOCALES.ENGLISH}>
			<Routes />
		</I18nProvider>
	</Provider>,
	document.getElementById('root')
);
