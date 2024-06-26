import React from 'react'
import "./TableProducts.css";
import Table from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';

export default function TableProducts({ items }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#Id</th>
          <th>Producto</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th className="table__actions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <ItemTable item={item} key={i}/>
        ))}
      </tbody>
    </Table>
  );
}
