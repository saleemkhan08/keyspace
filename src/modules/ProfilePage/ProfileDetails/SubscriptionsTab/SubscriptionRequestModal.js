import React from 'react';

import FormModal from 'components/FormModal/FormModal';

import babySitterRequest from './requestConfigs/babySitterRequest';
import './styles.scss';
import { SERVICE_TYPES } from 'globalState/services';

const SubscriptionRequestModal = ({ service, isOpen, onToggle }) => {
	const onSubmit = async () => {};
	let request;
	switch (service?.id) {
		case SERVICE_TYPES.COOK_SERVICE:
			request = babySitterRequest;
			break;
		case SERVICE_TYPES.MAID_SERVICE:
			request = babySitterRequest;
			break;
		case SERVICE_TYPES.WATER_TANKER_SERVICE:
			request = babySitterRequest;
			break;
		case SERVICE_TYPES.GARBAGE_COLLECTION_SERVICE:
			request = babySitterRequest;
			break;
		case SERVICE_TYPES.BABY_SITTING_SERVICE:
			request = babySitterRequest;
			break;
		case SERVICE_TYPES.NURSING_SERVICE:
			request = babySitterRequest;
			break;
		default:
			request = null;
	}

	return (
		request && (
			<FormModal
				initialValues={request.initialValues}
				isLoading={false}
				isOpen={isOpen}
				onSubmit={onSubmit}
				onToggle={onToggle}
				title={`${service?.name} Subscription Request`}
				config={request.config}
				validate={request.validate}
			/>
		)
	);
};

export default SubscriptionRequestModal;
