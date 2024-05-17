import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ children, details = null, title }) {
  return (
    <div className="card">
      <div className="card__details">
        <h2 className="card__title">{title}</h2>
        {details}
      </div>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  details: PropTypes.element,
  title: PropTypes.string.isRequired,
}
