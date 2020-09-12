import React from 'react';

const Support = () => {
	return (
		<div>
			<div>List of complaints</div>
			<div>Create New ticket</div>
			<div>
				<h1>Type of complaint</h1>
				<ul>
					<li>Plumbing</li>
					<li>Garbage/Sewage</li>
					<li>Electrical</li>
					<li>Carpenter</li>
					<li>Others</li>
				</ul>
			</div>

			<div> Description</div>
			<div>Submit button</div>
			<div>
				<h1>Info</h1>
				<div>
					<p>
						If any type of maintenance service is required then based on
						duration on living some percentage of the bill has to be paid by
						tenant
					</p>
					<ul>
						<li>Less than a month : 0% </li>
						<li>More than a month but less than 3 months : 25 %</li>
						<li>More than 3 months 50%</li>
						<li> More than a year 75%</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Support;
