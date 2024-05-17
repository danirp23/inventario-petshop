import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import "./FormularyProduct.css";

export default function FormularyProduct({ onSuccess, item }) {

  const initialValues = {
    name: item ? item.name || '' : '',
    description: item ? item.description || '' : '',
    image: item ? item.image || '' : '',
    stock: item ? item.stock || '' : '',
    price: item ? item.price || '' : ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'nombre muy corto')
      .max(20, 'nombre muy largo')
      .required('El campo es obligatorio'),
    description: Yup.string()
      .min(10, 'descripcion muy corta')
      .max(150, 'descripcion muy larga')
      .required('El campo es obligatorio'),
    image: Yup.string().required('El campo es obligatorio'),
    stock: Yup.number().required('El campo es obligatorio'),
    price: Yup.number().required('El campo es obligatorio'),
  })

  const onSubmit = async (values, { resetForm }) => {
    try {
      onSuccess(values);
      resetForm();
    } catch (error) {
      console.error("Error al procesar la respuesta del servicio:", error);
    }
  };

  return (
    <div className="form__container">
      {item ? null : <h1 className="form__title"> Nuevo Producto </h1>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="form">
            <FormBs.Group className="form__group">
              <label htmlFor='name' className="form__label"> Nombre  </label>
              <Field id='name' type='text' placeholder='Buzo' name='name' className="form__input form-control" />
              {errors.name && touched.name && (
                <ErrorMessage name='name' component='div' className="form__error"></ErrorMessage>
              )}
            </FormBs.Group>
            <div className="form__group">
              <label htmlFor='description' className="form__label"> Descripcion  </label>
              <Field id='description' type='text' placeholder='Buzo comodo invierno' name='description' className="form__input form-control" />
              {errors.description && touched.description && (
                <ErrorMessage name='description' component='div' className="form__error"></ErrorMessage>
              )}
            </div>
            <div className="form__group">
              <label htmlFor='image' className="form__label"> Imagen   </label>
              <Field id='image' type='text' placeholder='Imagen' name='image' className="form__input form-control" />
              {errors.image && touched.image && (
                <ErrorMessage name='image' component='div' className="form__error"></ErrorMessage>
              )}
            </div>
            <div className="form__group">
              <label htmlFor='stock' className="form__label"> Stock  </label>
              <Field id='stock' type='number' placeholder='5' name='stock' className="form__input form-control" />
              {errors.stock && touched.stock && (
                <ErrorMessage name='stock' component='div' className="form__error"></ErrorMessage>
              )}
            </div>
            <div className="form__group ">
              <label htmlFor='price' className="form__label"> Precio  </label>
              <Field id='price' type='number' placeholder='10000' name='price' className="form__input form-control" />
              {errors.price && touched.price && (
                <ErrorMessage name='price' component='div' className="form__error"></ErrorMessage>
              )}
            </div>

            <Button type='submit' className="form__submit btn btn-primary" disabled={isSubmitting}> Cargar Producto</Button>
            {isSubmitting ? (<p className="form__submitting">Enviando producto</p>) : null}
          </Form>
        )}
      </Formik>

    </div>
  )
}
