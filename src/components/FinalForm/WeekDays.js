import React, { useState, useEffect } from 'react';
import './styles.scss';

const WeekDays = ({ onChange, value }) => {
	const [selectedDays, setSelectedDays] = useState(value);
	useEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(selectedDays)) {
			setSelectedDays(value);
		}
	}, [selectedDays, value]);

	const handleDaySelection = (index) => {
		onChange(selectedDays.map((day, i) => (i === index ? !day : day)));
	};
	const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	return (
		<div className='weekdays-buttons-container'>
			{weekDays.map((dayText, index) => (
				<span
					className={`${
						selectedDays[index] ? 'active' : ''
					} weekdays-individual-button`}
					onClick={() => handleDaySelection(index)}>
					{dayText}
				</span>
			))}
		</div>
	);
};

export default WeekDays;
