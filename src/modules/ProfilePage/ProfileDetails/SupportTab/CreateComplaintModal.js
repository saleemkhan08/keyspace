import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Modal,
} from 'reactstrap';
import './styles.scss';

const CreateComplaintModal = ({ isOpen, onToggle }) => {
	return (
		<Modal
			className='modal-dialog-centered'
			size='sm'
			isOpen={isOpen}
			toggle={onToggle}>
			<div className='modal-body p-0'>
				<Card className='bg-secondary shadow border-0'>
					<CardHeader className='bg-white create-new-complaint-card-header'>
						<h3>Raise New Complaint</h3>
					</CardHeader>
					<CardBody className='px-lg-4 py-lg-4'>
						<InputGroup className='input-group-alternative'>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<i className='ni ni-email-83' />
								</InputGroupText>
							</InputGroupAddon>
							<Input placeholder='Email' type='email' />
						</InputGroup>
						<InputGroup className='input-group-alternative mt-3'>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>
									<i className='ni ni-lock-circle-open' />
								</InputGroupText>
							</InputGroupAddon>
							<Input
								placeholder='Password'
								type='password'
								autoComplete='off'
							/>
						</InputGroup>
						<div className='text-center'>
							<Button className='mt-3' color='primary' type='button'>
								Save
							</Button>
						</div>
					</CardBody>
				</Card>
			</div>
		</Modal>
	);
};

export default CreateComplaintModal;
