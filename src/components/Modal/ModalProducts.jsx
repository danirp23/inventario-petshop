import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import FormularyProduct from '../Formulary/FormularyProduct';
import { updateProducts } from '../../services/axios.config';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';

export default function ModalProducts(props) {

  const { items, dispatch } = useContext(ItemsContext)

  const onSuccess = async (values) => {
    props.onHide()

    try {
      const result = await updateProducts(props.item.id, values);
      const itemsUpload = items.map(item => {
        return item.id === result.data.id ? result.data : item
      })
      dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload});
    } catch (error) {
      console.error("Error al procesar la respuesta del servicio:", error);
      throw error;
    }
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Actualiza del Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularyProduct onSuccess={onSuccess} item={props.item}> </FormularyProduct>
        </Modal.Body>
      </Modal>
    </div>
  )
}
