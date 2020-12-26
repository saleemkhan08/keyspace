import React from 'react';
import { Row } from 'reactstrap';

const CardsGrid = ({ ChildComponent, listItems }) => {
	return (
		<Row className='row-grid justify-content-center'>
			{listItems.map((item, index) => (
				<ChildComponent key={item.name} item={item} />
			))}
		</Row>
	);
};
export default CardsGrid;
