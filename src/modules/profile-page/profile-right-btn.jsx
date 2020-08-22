import React from 'react';
import { Button, Col } from 'reactstrap';

export const ProfileRightBtn = () => {
	return (
		<Col className='order-lg-3 text-lg-right align-self-lg-center' lg='4'>
			<div className='card-profile-actions py-4 mt-lg-0'>
				<Button
					className='mr-4'
					color='info'
					href='#pablo'
					onClick={(e) => e.preventDefault()}
					size='sm'>
					Connect
				</Button>
				<Button
					className='float-right'
					color='default'
					href='#pablo'
					onClick={(e) => e.preventDefault()}
					size='sm'>
					Message
				</Button>
			</div>
		</Col>
	);
};

export const ProfileLeftBtn = () => {
	return (
		<Col className='order-lg-1' lg='4'>
			<div className='card-profile-stats d-flex justify-content-center'>
				<div>
					<span className='heading'>22</span>
					<span className='description'>Friends</span>
				</div>
				<div>
					<span className='heading'>10</span>
					<span className='description'>Photos</span>
				</div>
				<div>
					<span className='heading'>89</span>
					<span className='description'>Comments</span>
				</div>
			</div>
		</Col>
	);
};
