import React, { useEffect, useState } from 'react'
import TableProducts from '../components/Table/TableProducts';
import { getProducts } from '../services/axios.config';
import "./stockProducts.css";

export default function StockProducts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setItems(response.data);
      } catch (error) {
        console.error("Error al procesar la respuesta del servicio:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="stock__container">
      <h1 className="stock__title">Listar Productos</h1>
      <div className='stock__table'>
        {
          items.length > 0 ?
            <TableProducts items={items}></TableProducts>
            :
            <p> No hay datos para mostrar</p>
        }
      </div>
    </div>
  )
}

