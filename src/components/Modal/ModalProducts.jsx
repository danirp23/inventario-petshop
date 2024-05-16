import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormularyProduct from '../Formulary/FormularyProduct';
import { updateProducts } from '../../services/axios.config';

export default function ModalProducts(props) {
  const onSuccess = async (values) => {
    await props.onSubmit(props.item.id, values)
    props.onHide()
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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularyProduct onSuccess={onSuccess} item={props.item}> </FormularyProduct>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
