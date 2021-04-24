import React, { useState, useEffect } from 'react';
import './styles.scss';

const TimeRange = ({ onChange, value }) => {
	const [selectedDays, setSelectedDays] = useState(value);
	useEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(selectedDays)) {
			setSelectedDays(value);
		}
	}, [selectedDays, value]);

	const handleDaySelection = (index) => {
		onChange(selectedDays.map((day, i) => (i === index ? !day : day)));
	};
	return <div className='weekdays-buttons-container'></div>;
};

export default TimeRange;
