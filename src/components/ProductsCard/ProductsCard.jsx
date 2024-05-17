import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import ProductsDetails from '../ProductsDetails/ProductsDetails';
import './ProductsCard.css';

export default function ProductsCard({ product }) {
  const { name } = product;

  return (
    <Card title={name}>
      <ProductsDetails product={product} />
    </Card>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
};
