import React, { useState } from 'react'
import "./ItemTable.css";
import ModalProducts from '../Modal/ModalProducts';

export default function ItemTable({ item, editItem }) {
  const { name, price, stock, id } = item;
  const [modalShow, setModalShow] = useState(false);


  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td className="table__icons">
          <i className="bi bi-trash" onClick={() => setModalShow(true)}></i>
          <i className="bi bi-pencil" onClick={editItem}></i>
        </td>
      </tr>
      <ModalProducts
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        onSubmit={editItem}
      />
    </>
  )
}
