import React from 'react';
import PropTypes from 'prop-types';
import './ProductsDetails.css';

export default function ProductsDetails({ product }) {
  const { name, description, image, price, stock } = product;

  return (
    <div className="products-details">
      <img className="products-details__image" src={image} alt={name} style={{ width: '100px', height: '100px' }} />
      <p className="products-details__description">{description}</p>
      <p className="products-details__price">Precio: {price}</p>
      <p className="products-details__stock">Stock: {stock}</p>
    </div>
  );
}

ProductsDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
  }).isRequired,
};
