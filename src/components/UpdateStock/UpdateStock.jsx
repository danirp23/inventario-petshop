import React, { useContext, useEffect, useState } from 'react';
import './UpdateStock.css';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';
import { Form, Button } from 'react-bootstrap';
import { updateProducts } from '../../services/axios.config';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../hooks/AlertProvider/AlertProvider';

export default function UpdateStock() {
  const { items, dispatch } = useContext(ItemsContext);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [soldQuantity, setSoldQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const showAlert = useAlert();

  useEffect(() => {
    const product = items.find(item => item.id === selectedProduct);
    setErrorMessage('');
    if (product && product.stock === 0) {
      showAlert('Su producto no tiene stock', 'danger');
      setErrorMessage('Su producto no tiene stock');
    }
  }, [selectedProduct, items, showAlert]);

  useEffect(() => {
    setErrorMessage('');
    if (selectedProductItem && parseInt(soldQuantity) > selectedProductItem.stock) {
      showAlert('Su producto no tiene stock suficiente', 'danger');
      setErrorMessage('Su producto no tiene stock suficiente');
    }
  }, [selectedProduct, soldQuantity, showAlert]);

  const selectedProductItem = items.find(item => item.id === selectedProduct);

  const canUpdateStock = () => {
    return selectedProduct && soldQuantity > 0 && selectedProductItem && selectedProductItem.stock > 0;;
  };

  const handleUpdateStock = async () => {
    if (canUpdateStock() && parseInt(soldQuantity) <= selectedProductItem.stock) {
      try {
        selectedProductItem.stock = selectedProductItem.stock - parseInt(soldQuantity);
        const result = await updateProducts(selectedProduct, selectedProductItem);
        const itemsUpload = items.map(item => (item.id === result.data.id ? result.data : item));
        dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload });
        setSoldQuantity('');
        setErrorMessage('');
        setSelectedProduct('');
        showAlert('¡Su venta fue registrada!', 'success');
      } catch (error) {
        console.error("Error al procesar la respuesta del servicio:", error);
        navigate('/error');
      }
    }
  };



  return (
    <div className="update-stock">
      <h3 className="update-stock__title">Venta Rápida</h3>
      <Form.Group controlId="productSelect" className="update-stock__form-group">
        <Form.Label className="update-stock__label">Seleccionar Producto</Form.Label>
        <Form.Control
          as="select"
          value={selectedProduct}
          onChange={e => setSelectedProduct(e.target.value)}
          className="update-stock__select"
        >
          <option value="" disabled>
            Seleccionar producto
          </option>
          {items.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="soldQuantityInput" className="update-stock__form-group">
        <Form.Label className="update-stock__label">Cantidad Vendida</Form.Label>
        <Form.Control
          type="number"
          value={soldQuantity}
          onChange={e => setSoldQuantity(e.target.value)}
          placeholder="Cantidad vendida"
          className="update-stock__input"
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={handleUpdateStock}
        className="update-stock__button"
        disabled={!canUpdateStock()}
      >
        Actualizar
      </Button>
      {errorMessage && <p className="update-stock__error">{errorMessage}</p>}
    </div>
  );
}
