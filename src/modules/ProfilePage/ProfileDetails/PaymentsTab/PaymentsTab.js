import React from 'react';
import './styles.scss';

const Payments = () => {
	return (
		<div>
			<ul>
				<li>Rent has to be paid on or before 5th of every month</li>
				<li>After 5th interest is applied on the number of days delayed. </li>
				<li>3% interest per month applicable on each day.</li>
				<li>Example : 15000 Rent corresponds to 450 / month or 15 / day</li>
				<li>
					Monthly rent and other bills will be uploaded to the tenants profile.
				</li>
				<li>
					Water bill and Electricity bill : Since tenants might delay paying the
					bill and there is a chance that electricity might be cut for the
					entire building if the bill is not paid. Keyspace will pay all the
					bills on tenants behalf and will collect the amount as part of the
					rent.
				</li>
				<li>Other services opted</li>
				<li>Same interest applies to every service.</li>
				<li>One months rent will be deducted from Advance for revamp.</li>
				<li>
					If a tenant leaves before the tenancy duration is finished then
					additional one month’s rent will be deducted.
				</li>
				<li>1 month notice should be given before leaving.</li>
				<li>
					If any of the bills are not paid then the amount will be deducted from
					the advance while leaving.
				</li>
			</ul>
		</div>
	);
};

export default Payments;
