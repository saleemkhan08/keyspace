import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import messages from 'i18n/translations';
import LOCALES from 'i18n/locales';

export default ({ children, locale = LOCALES.ENGLISH }) => (
	<IntlProvider locale={locale} textComponent={Fragment} messages={messages}>
		{children}
	</IntlProvider>
);
