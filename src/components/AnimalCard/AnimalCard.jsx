import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import AnimalDetails from '../AnimalDetails/AnimalDetails';

export default function AnimalCard({ name, size, ...props }) {
  return (
    <Card title="Animal"
      details={
        <AnimalDetails
          {...props}
        />
      }
    >
      <h3>{name}</h3>
      <div>{size}kg</div>
      <AnimalDetails
        {...props}
      />
    </Card>
  )
}

AnimalCard.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}