import React from 'react'
import "./ItemTable.css";

export default function ItemTable({ item }) {
  const { name, price, stock, id } = item;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td className="table__icons">
        <i className="bi bi-trash"></i>
        <i className="bi bi-pencil"></i>
      </td>
    </tr>
  )
}
