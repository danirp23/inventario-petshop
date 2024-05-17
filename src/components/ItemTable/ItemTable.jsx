import React, { useContext, useState } from 'react'
import "./ItemTable.css";
import ModalProducts from '../Modal/ModalProducts';
import { deleteProducts } from '../../services/axios.config';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';

export default function ItemTable({ item, editItem }) {
  const { name, price, stock, id } = item;
  const [modalShow, setModalShow] = useState(false);
  const {items, dispatch} = useContext(ItemsContext)

  const handleDelete = async (id) => {
    try {
      const response = await deleteProducts(id);
      const itemsUpload = items.filter(item => item.id !== response.data.id);
      dispatch({type:UPLOAD_ITEMS, payload: itemsUpload });
    } catch (error) {
      console.error("Error al procesar la respuesta del servicio:", error);
      throw error;
    }
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td className="table__icons">
          <i className="bi bi-trash" onClick={() => handleDelete(id)}></i>
        <i className="bi bi-pencil" onClick={() => setModalShow(true)}></i>
      </td>
    </tr >
      <ModalProducts
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
      />
    </>
  )
}
