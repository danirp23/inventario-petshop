import React from 'react'
import FormularyProduct from '../components/Formulary/FormularyProduct'
import { createNewProduct } from '../services/axios.config';
import { useAlert } from '../hooks/AlertProvider/AlertProvider';
import { useNavigate } from 'react-router-dom'; 

export default function CreateProduct() {
  const showAlert = useAlert();
  const navigate = useNavigate(); 

  const onSuccess = async (values) => {
    try {
      await createNewProduct(values);
      showAlert('¡Registro creado exitosamente!', 'success');
    } catch (error) {
      console.error("Error al procesar la respuesta del servicio:", error);
      navigate('/error');
    }
  };
  return (
    <div>
      <FormularyProduct onSuccess={onSuccess}> </FormularyProduct>
    </div>
  )
}
