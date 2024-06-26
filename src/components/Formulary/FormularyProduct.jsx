import React, { useContext, useEffect, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import "./FormularyProduct.css";
import useImageUploader from '../../hooks/ImageUploader/ImageUploader';
import { useNavigate } from 'react-router-dom';
import { CategoryContext, UPLOAD_CATEGORIES } from '../../context/itemsContext';
import { getCategory } from '../../services/axiosCategory.consig';

export default function FormularyProduct({ onSuccess, item }) {
  const { imageFile, imagePreview, handleImageChange, error, resetImageState } = useImageUploader();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { categoryDis, dispatchCategory } = useContext(CategoryContext);

  const initialValues = {
    name: item ? item.name || '' : '',
    category: item ? item.category || '' : '',
    description: item ? item.description || '' : '',
    image: item ? item.image || '' : '',
    stock: item ? item.stock || '' : '',
    price: item ? item.price || '' : ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'nombre muy corto')
      .max(40, 'nombre muy largo')
      .required('El campo es obligatorio'),
    category: Yup.string().required(),
    description: Yup.string()
      .min(5, 'descripcion muy corta')
      .max(150, 'descripcion muy larga')
      .required('El campo es obligatorio'),
    stock: Yup.number().required('El campo es obligatorio').positive('El stock debe ser un número positivo'),
    price: Yup.number().required('El campo es obligatorio'),
  })

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (imageFile) {
        values.image = imagePreview;
      }
      onSuccess(values);
      resetForm();
      resetImageState();
      fileInputRef.current.value = '';
    } catch (error) {
      navigate('/error');
      console.error('Error al procesar la respuesta del servicio:', error);
    }
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
    <div className={`form__container ${item && item.image ? 'has-image' : ''}`}>
      {item ? <img className="form__title" src={item.image} alt="Producto" /> : <h1 className="form__title">Nuevo Producto</h1>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="form">
            <FormBs.Group className="form__group">
              <label htmlFor='name' className="form__label"> Nombre </label>
              <Field id='name' type='text' placeholder='Buzo' name='name' className="form__input form-control" />
              {errors.name && touched.name && (
                <ErrorMessage name='name' component='div' className="form__error"></ErrorMessage>
              )}
            </FormBs.Group>
            <div className="form__group">
            <label htmlFor='category' className="form__label"> Categoria </label>
              <Field as="select" name="category" id='category' className="form__category__input form-control">
                <option value="" disabled>
                  Seleccione la categoria
                </option>
                {categoryDis.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              {errors.category && touched.category && (
                <ErrorMessage name='category' component='div' className="form__error"></ErrorMessage>
              )}
            </div>
            <div className="form__group">
              <label htmlFor='description' className="form__label"> Descripcion  </label>
              <Field id='description' type='text' placeholder='Buzo comodo invierno' name='description' className="form__input form-control" />
              {errors.description && touched.description && (
                <ErrorMessage name='description' component='div' className="form__error"></ErrorMessage>
              )}
            </div>
            <div className="form__group">
              <label htmlFor='image' className="form__label">Imagen</label>
              <input
                ref={fileInputRef}
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form__input form-control"
              />
              {errors.image && touched.image && (
                <ErrorMessage name='image' component='div' className="form__error"></ErrorMessage>
              )}
              {error && <div className="form__error">{error}</div>}
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="form__image-preview" />
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