import React from 'react';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <i class="bi bi-exclamation-triangle-fill error-page__icon"></i>
        <h1 className="error-page__title">Error 404</h1>
        <p className="error-page__message">Lo sentimos, la página que estás buscando no pudo ser encontrada.</p>
      </div>
    </div>
  );
}
