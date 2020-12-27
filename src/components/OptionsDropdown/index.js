import React from 'react';
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from 'reactstrap';

const OptionsDropdown = ({ options, className, title, direction, size }) => (
	<div className={className}>
		<UncontrolledDropdown direction={direction}>
			<DropdownToggle caret color='default' size={size}>
				{title}
			</DropdownToggle>
			<DropdownMenu>
				{options?.map((option) => (
					<DropdownItem key={option.key} onClick={option.onClick}>
						{option.value}
					</DropdownItem>
				))}
			</DropdownMenu>
		</UncontrolledDropdown>
	</div>
);

OptionsDropdown.defaultProps = {
	size: 'sm',
	title: 'Options',
};

export default OptionsDropdown;
