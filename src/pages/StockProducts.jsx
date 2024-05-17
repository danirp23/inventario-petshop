import React, { useContext, useEffect } from 'react'
import TableProducts from '../components/Table/TableProducts';
import { getProducts } from '../services/axios.config';
import "./stockProducts.css";
import { ItemsContext, UPLOAD_ITEMS } from '../context/itemsContext';

export default function StockProducts() {

  const {items, dispatch} = useContext(ItemsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        dispatch({type: UPLOAD_ITEMS, payload: response.data})
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

