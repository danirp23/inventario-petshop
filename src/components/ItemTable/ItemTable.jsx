import React, { useContext, useEffect, useState } from 'react'
import "./ItemTable.css";
import ModalProducts from '../Modal/ModalProducts';
import { deleteProducts } from '../../services/axios.config';
import { CategoryContext, ItemsContext, UPLOAD_CATEGORIES, UPLOAD_ITEMS } from '../../context/itemsContext';
import { getCategory } from '../../services/axiosCategory.consig';

export default function ItemTable({ item, editItem }) {
  const { name, price, stock, id, category } = item;
  const [modalShow, setModalShow] = useState(false);
  const {items, dispatch} = useContext(ItemsContext)
  const { categoryDis, dispatchCategory } = useContext(CategoryContext);

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

  const getCategoryName = (categoryId) => {
    const foundCategory = categoryDis.find(cat => cat.id === categoryId);
    return foundCategory ? foundCategory.name : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategory = await getCategory();
        dispatchCategory({ type: UPLOAD_CATEGORIES, payload: responseCategory.data });
      } catch (error) {
        console.error("Error al procesar la respuesta del servicio:", error);
      }
    };

    fetchData();
  }, [dispatchCategory]);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{getCategoryName(category)}</td>
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
