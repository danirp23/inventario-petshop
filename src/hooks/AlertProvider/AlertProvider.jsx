import React, { useState, createContext, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import './AlertProvider.css';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [variant, setVariant] = useState('success');

  const showAlert = (message, alertVariant = 'success') => {
    setVariant(alertVariant);
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && (
        <div className="alert-container">
          <Alert variant={variant} className={`alert ${alert ? '' : 'alert--hide'}`}>
            {alert}
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};
