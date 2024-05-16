import React from 'react'
import FormularyProduct from '../components/Formulary/FormularyProduct'
import { createNewProduct } from '../services/axios.config';

export default function CreateProduct() {
  const onSuccess = async (values) => {
    try {
      await createNewProduct(values);
    } catch (error) {
      console.error("Error al procesar la respuesta del servicio:", error);
      throw error;
    }
  };
  return (
    <div>
      <FormularyProduct onSuccess={onSuccess}> </FormularyProduct>
    </div>
  )
}
